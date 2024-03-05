import styles from "../../styles";
import RegistrationFormHeading from "../../components/RegistrationComps/RegistrationFormHeading/RegistrationFormHeading";
import ButtonSectionGreenBg from "../../components/Buttons/ButtonSectionGreenBg";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";
import ButtonSectionWhiteBg from "../../components/Buttons/ButtonSectionWhiteBg";
import { useEffect, useState } from "react";
import YellowLoader from "../../components/Loader/YellowLoader";
import { useAppContext } from "../../context/AppContext";
import doctorCategoryMappings from "../../../doctorProfessionMapping.json";
import {
  API_BASE_URL,
  RE_SCHEDULE_PHONE_NUMBER,
  CANCEL_PHONE_NUMBER,
} from "../../../env.config";
import AnswerStatus from "../../components/AppointmentDetails/AnswerStatus";

const questionnaires = ["SDOH", "Medical History"];

const ConfirmAppointment = () => {
  const location = useLocation();
  const { appContextState } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [currentPatientInfo, setCurrentPatientInfo] = useState(null);
  const [isAppointmentConfirmed, setIsAppointmentConfirmed] = useState(
    location.state?.appointmentConfirmed || true
  );
  const [answerCounts, setAnswerCounts] = useState({});

  const navigate = useNavigate();

  const confirmAppointment = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(currentPatientInfo);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/appointment/createAppointment`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("appointment confirmation say,", result);
        if (result.message === "OK") {
          setIsAppointmentConfirmed(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("confirm appointment error", error);
        setLoading(false);
      });
  };

  const requestQuestionnaire = (questionnaireType) => {
    setLoading(true);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${API_BASE_URL}/questionnaire/fetchQuestionnaire?patientId=${
        currentPatientInfo?.patientId
      }&appDateTime=${
        currentPatientInfo?.appointmentDetails[0]?.appointmentDateTime
      }&hospitalName=${currentPatientInfo?.hospitalName}&category=${
        questionnaireType === "SDOH"
          ? "General"
          : currentPatientInfo?.appointmentDetails[0]?.appointmentType
      }&type=${questionnaireType}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("questionnaire api", result);
        console.log("questionnaire", result?.json);
        localStorage.setItem("questionnaireType", questionnaireType);
        localStorage.setItem(questionnaireType, JSON.stringify(result?.json));
        localStorage.setItem(
          "sdohQuestionnaire",
          JSON.stringify(
            result?.json[
              questionnaireType === "SDOH"
                ? "General"
                : currentPatientInfo?.appointmentDetails[0]?.appointmentType
            ]
          )
        );
        navigate("/dashboard/questionnaire/download_or_online", {
          state:
            result?.json[
              questionnaireType === "SDOH"
                ? "General"
                : currentPatientInfo?.appointmentDetails[0]?.appointmentType
            ],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("questionnaire api error", error);
        setLoading(false);
      });
  };

  const handleRescheduleBtnClick = () => {
    makePhoneCall(RE_SCHEDULE_PHONE_NUMBER);
  };

  const handleCancelBtnClick = () => {
    makePhoneCall(CANCEL_PHONE_NUMBER);
  };

  const makePhoneCall = (phoneNumber) => {
    // Use a suitable method to initiate a phone call based on the platform (web or mobile)
    // For web, you can use the "tel:" URL scheme
    window.location.href = `tel:${phoneNumber}`;
  };

  useEffect(() => {
    setCurrentPatientInfo(appContextState.patientInfo);
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem(
        questionnaires.at(0) || localStorage.getItem(questionnaires.at(1))
      )
    ) {
      let temp = answerCounts;
      questionnaires.map((questionnaireType) => {
        if (localStorage.getItem(questionnaireType)) {
          const questionnaire = Object.values(
            JSON.parse(localStorage.getItem(questionnaireType))
          );
          console.log("questionnaire answer count", questionnaire);
          let count = 0;
          questionnaire[0].map((question) => {
            if (question?.Answer && question.Answer.length) count++;
          });
          temp[questionnaireType] = count;
        }
      });
      setAnswerCounts(temp);
      console.log(answerCounts);
    }
  }, []);

  return (
    <div
      className={`${styles.minSectionHeight} ${styles.xSectionPadding} ${styles.ySectionPadding} flex flex-col items-center gap-5 pb-10`}
    >
      {isAppointmentConfirmed ? (
        <RegistrationFormHeading heading={"Your Appointment is Confirmed"} />
      ) : (
        <>
          <RegistrationFormHeading heading={"Hello"} />
          <RegistrationFormHeading heading={currentPatientInfo?.patientName} />
          <span className="w-full max-w-[500px] text-center text-PrimaryGrayText font-medium">
            We have received your appointment request for:
          </span>
        </>
      )}
      <AppointmentDetails
        doctorName={currentPatientInfo?.appointmentDetails[0]?.doctorName}
        specialty={
          doctorCategoryMappings[
            currentPatientInfo?.appointmentDetails[0]?.appointmentType
          ]
        }
        dateTime={currentPatientInfo?.appointmentDetails[0]?.appointmentDateTime
          .split("T")
          .join(" | ")}
        patientName={`${currentPatientInfo?.patientName} (Self)`}
        appointmentType={
          currentPatientInfo?.appointmentDetails[0]?.appointmentType
        }
        ratingValue={currentPatientInfo?.appointmentDetails[0]?.doctorRating}
      />
      {isAppointmentConfirmed ? (
        <>
          {loading ? (
            <YellowLoader />
          ) : (
            <>
              <div className="w-full max-w-[500px] text-center text-orange-700 text-base font-semibold font-['Lato']">
                There are questions that you will need to complete before your
                appointment.
              </div>
              <div className="w-full max-w-[540px] text-center text-black text-2xl font-normal font-['Roboto Slab'] leading">
                If you fill out the information using our app now, you&apos;ll
                enjoy the convenience of not having to re-enter these details in
                the future.
              </div>
              {/* Use flexbox to arrange the buttons and progress status */}
              <div className="flex flex-col md:flex-row gap-4">
                {questionnaires.map((questionnaireCategory, i) => (
                  <div className="flex flex-col items-center gap-1" key={i}>
                    <ButtonSectionGreenBg
                      buttonName={questionnaireCategory}
                      onClick={() => {
                        requestQuestionnaire(questionnaireCategory);
                      }}
                    />

                    {answerCounts[questionnaireCategory] >= 0 && (
                      <AnswerStatus
                        answered={answerCounts[questionnaireCategory]}
                        total={
                          Object.values(
                            JSON.parse(
                              localStorage.getItem(questionnaireCategory)
                            )
                          )[0].length
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
              <ButtonSectionWhiteBg
                className="border-white underline"
                buttonName="Answer Later"
              />
            </>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <YellowLoader />
          ) : (
            <>
              <ButtonSectionGreenBg
                buttonName={"CONFIRM"}
                onClick={confirmAppointment}
              />
              <div className="flex flex-col md:flex-row">
                <ButtonSectionWhiteBg
                  className="border-white"
                  buttonName="Reschedule"
                  onClick={handleRescheduleBtnClick}
                />
                <ButtonSectionWhiteBg
                  className="border-white"
                  buttonName="Cancel"
                  onClick={handleCancelBtnClick}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ConfirmAppointment;
