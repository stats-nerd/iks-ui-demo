import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import styles from "../../../styles";
import RegistrationFormHeading from "../../../components/RegistrationComps/RegistrationFormHeading/RegistrationFormHeading";
import CustomDropdown from "../../../components/CustomFields/CustomDropdown";
import CustomInputField from "../../../components/CustomFields/CustomInputField";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";
import TextFieldPairWrapper from "../../../components/Wrappers/TextFieldPairWrapper";
import YellowLoader from "../../../components/Loader/YellowLoader";
import { API_BASE_URL } from "../../../../env.config";

const InsuranceReview = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { state, dispatch } = useRegistrationContext();
  const { insurance_info, insuranceProviderOptions } = state;

  const updateInsuranceForm = (update) => {
    console.log({ ...insurance_info, ...update });
    dispatch({
      type: "UPDATE_INS_INFO",
      payload: { ...insurance_info, ...update },
    });
  };

  const handleContinueBtnClick = () => {
    setLoader(true);
    console.log("insurance payload", insurance_info);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(insurance_info);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/insurance/createInsurance`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("insurance api says", result);
        navigate("/dashboard/registration/credit");
        setLoader(false);
      })
      .catch((error) => {
        console.error("insurance api error", error);
        setLoader(false);
      });
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_SIDE_STEPPER_HEADING",
      payload:
        "Let’s add you insurance information to your profile, Please scan your insurance card front and back and then review and correct the information in the form below",
    });
    dispatch({ type: "UPDATE_STEPPER_PAGE", payload: 2 });
  }, []);

  return (
    <div
      className={`${styles.minSectionHeight} ${styles.xSectionPadding} ${styles.ySectionPadding} flex flex-col items-center gap-5 pb-10`}
    >
      <RegistrationFormHeading heading={"Insurance Information"} />
      <span className="w-[90%] max-w-[500px] text-center text-PrimaryGrayText font-medium">
        Please examine the information provided below, as errors may occur
        occasionally due to OCR processing.
      </span>
      <TextFieldPairWrapper>
        <CustomDropdown
          label="Select Insurance Provider *"
          value={insurance_info.insuranceProvider}
          onChange={(e) => {
            updateInsuranceForm({ insuranceProvider: e.target.value });
          }}
          options={insuranceProviderOptions}
        />
        <CustomInputField
          label="Member ID *"
          placeholder="Enter your member ID"
          value={insurance_info.memberId}
          onChange={(e) => {
            updateInsuranceForm({ memberId: e.target.value });
          }}
        />
      </TextFieldPairWrapper>
      <TextFieldPairWrapper>
        <CustomInputField
          label="Group Number *"
          placeholder="Enter your group number"
          value={insurance_info.bloodGroup}
          onChange={(e) => {
            updateInsuranceForm({ bloodGroup: e.target.value });
          }}
        />
        <CustomInputField
          label="Payer ID *"
          placeholder="Enter your payer ID"
          value={insurance_info.payerId}
          onChange={(e) => {
            updateInsuranceForm({ payerId: e.target.value });
          }}
        />
      </TextFieldPairWrapper>
      <TextFieldPairWrapper>
        <CustomInputField
          label="Policyholder *"
          placeholder="Enter policyholder"
          value={insurance_info.policyHolderName}
          onChange={(e) => {
            updateInsuranceForm({ policyHolderName: e.target.value });
          }}
        />
        <CustomInputField
          label="Relation with 
Policyholder *"
          placeholder="Enter your relation with 
policyholder"
          value={insurance_info.policyType}
          onChange={(e) => {
            updateInsuranceForm({ policyType: e.target.value });
          }}
        />
      </TextFieldPairWrapper>
      {loader ? (
        <>
          <YellowLoader />
          <span className="font-robotoSlab text-center text-sm text-gray-500">
            Saving your Insurance Information
          </span>
        </>
      ) : (
        <>
          <ButtonSectionGreenBg
            buttonName={"continue"}
            onClick={handleContinueBtnClick}
          />
          <ButtonSectionWhiteBg
            className="border-white"
            buttonName="Back"
            onClick={() => {
              navigate(-1);
            }}
          />
        </>
      )}
    </div>
  );
};

export default InsuranceReview;
