import { doctor_group } from "../../assets";
import Card from "../../components/Card/Card";
import styles from "../../styles";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import docProfessionMapping from "../../../doctorProfessionMapping.json";

const AppointmentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patientName = location?.state?.currentPatientInfo?.patientName;

  const doctorsData = [
    {
      name: location?.state?.currentPatientInfo?.appointmentDetails[0]
        .doctorName,
      photo: doctor_group,
      rating:
        location?.state?.currentPatientInfo?.appointmentDetails[0].doctorRating,
      type: docProfessionMapping[
        location?.state?.currentPatientInfo?.appointmentDetails[0]
          .appointmentType
      ],
      dateTime:
        location?.state?.currentPatientInfo?.appointmentDetails[0]
          .appointmentDateTime,
      forms: [
        { formName: "SDOH", isFormCompleted: location?.state?.isSdohFilled },
        {
          formName: "Medical History",
          isFormCompleted: location?.state?.isMedicalHistoryFilled,
        },
      ],
    },
  ];

  const upcomingAppointmentsCount = doctorsData.length;

  useEffect(() => {
    console.log(location.state);
    if (!location.state) {
      navigate("/dashboard/confirmAppointment", {
        state: {
          appointmentConfirmed: true,
        },
      });
    }
  }, []);
  return (
    <div
      className={`${styles.minSectionHeight} ${styles.xSectionPadding} ${styles.ySectionPadding} flex flex-col items-center gap-0 pb-10 overflow-x-auto`}
    >
      <div className="text-center">
        <Typography variant="h6" className="text-[#6da55b]">
          {patientName}
        </Typography>
        {/* <Typography
          variant="subtitle2"
          className="text-[#6da55b] underline cursor-pointer"
        >
          Complete your profile
        </Typography> */}
      </div>

      <h2 className="text-left font-semibold mt-2 mx-2">
        {upcomingAppointmentsCount > 0
          ? `You have ${upcomingAppointmentsCount} upcoming ${
              upcomingAppointmentsCount === 1 ? "appointment" : "appointments"
            }`
          : "No upcoming appointments"}
      </h2>

      <div className="flex items-center justify-center overflow-x-auto w-full">
        {doctorsData.map((doctor, index) => (
          <div key={index} className="mx-2">
            <Card doctor={doctor} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex flex-col items-center text-[#6da55b]">
          <div className="bg-PrimaryGreenLighter p-2 rounded-full">
            <PhoneIcon />
          </div>
          <Typography variant="subtitle1" className="text-center">
            Call Us
          </Typography>
        </div>
        <div className="flex flex-col items-center text-[#6da55b]">
          <div className="bg-PrimaryGreenLighter p-2 rounded-full">
            <ChatIcon />
          </div>
          <Typography variant="subtitle1" className="text-center">
            Start Chat
          </Typography>
        </div>
        <div className="flex flex-col items-center text-[#6da55b]">
          <div className="bg-PrimaryGreenLighter p-2 rounded-full">
            <HelpOutlineIcon />
          </div>
          <Typography variant="subtitle1" className="text-center">
            FAQ
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDashboard;
