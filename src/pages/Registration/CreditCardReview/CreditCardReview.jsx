import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import styles from "../../../styles";
import RegistrationFormHeading from "../../../components/RegistrationComps/RegistrationFormHeading/RegistrationFormHeading";
import TextFieldPairWrapper from "../../../components/Wrappers/TextFieldPairWrapper";
import CustomDropdown from "../../../components/CustomFields/CustomDropdown";
import CustomInputField from "../../../components/CustomFields/CustomInputField";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";
import YellowLoader from "../../../components/Loader/YellowLoader";
import { API_BASE_URL } from "../../../../env.config";

const CreditCardReview = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { state, dispatch } = useRegistrationContext();
  const {
    creditCard_info,
    creditCardOptions,
    creditCardMonthOptions,
    creditCardYearOptions,
  } = state;

  const updateCreditCardForm = (update) => {
    console.log({ ...creditCard_info, ...update });
    dispatch({
      type: "UPDATE_CREDIT_CARD_INFO",
      payload: { ...creditCard_info, ...update },
    });
  };

  const handleContinueBtnClick = () => {
    setLoader(true);
    console.log("credit card payload", creditCard_info);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(creditCard_info);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/creditCard/createCreditCard`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate("/dashboard/confirmAppointment", {
          state: { appointmentConfirmed: false },
        });
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_SIDE_STEPPER_HEADING",
      payload:
        "Please provide your payment information details. Having your payment information on file via our secure server will save you time by eliminating the need to provide it over and over again every time you have to make a payment.",
    });
    dispatch({ type: "UPDATE_STEPPER_PAGE", payload: 3 });
  }, []);

  return (
    <div
      className={`${styles.minSectionHeight} ${styles.xSectionPadding} ${styles.ySectionPadding} flex flex-col items-center gap-5 pb-10`}
    >
      <RegistrationFormHeading heading={"credit card"} />
      <span className="w-full max-w-[500px] text-center text-PrimaryGrayText font-medium">
        Please examine the information provided below, as errors may occur
        occasionally due to OCR processing.
      </span>
      <TextFieldPairWrapper>
        <CustomDropdown
          label="Select Credit Card Provider"
          value={creditCard_info.creditCardProvider}
          onChange={(e) => {
            updateCreditCardForm({ creditCardProvider: e.target.value });
          }}
          options={creditCardOptions}
        />
        <CustomInputField
          label="Credit Card Number"
          placeholder="Enter your credit card number"
          value={creditCard_info.creditCardNumber}
          onChange={(e) => {
            updateCreditCardForm({ creditCardNumber: e.target.value });
          }}
        />
      </TextFieldPairWrapper>
      <TextFieldPairWrapper>
        <CustomDropdown
          label="Month"
          value={creditCard_info.creditCardExpiryMonth}
          onChange={(e) => {
            updateCreditCardForm({ creditCardExpiryMonth: e.target.value });
          }}
          options={creditCardMonthOptions}
          maxWidth={{ xs: 300, md: 140 }}
        />
        <CustomDropdown
          label="Year"
          value={creditCard_info.creditCardExpiryYear}
          onChange={(e) => {
            updateCreditCardForm({ creditCardExpiryYear: e.target.value });
          }}
          options={creditCardYearOptions}
          maxWidth={{ xs: 300, md: 140 }}
        />
        <CustomInputField
          label="Credit Card Holder Name"
          placeholder="Enter your credit card holder name"
          value={creditCard_info.creditCardHolderName}
          onChange={(e) => {
            updateCreditCardForm({
              creditCardHolderName: e.target.value,
            });
          }}
        />
      </TextFieldPairWrapper>
      {loader ? (
        <>
          <YellowLoader />
          <span className="font-robotoSlab text-center text-sm text-gray-500">
            Saving your Credit Card Information
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

export default CreditCardReview;
