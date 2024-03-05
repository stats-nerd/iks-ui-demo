import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegistrationContext } from "../../../context/RegistrationContext";
import styles from "../../../styles";
import RegistrationFormHeading from "../../../components/RegistrationComps/RegistrationFormHeading/RegistrationFormHeading";
import CustomInputField from "../../../components/CustomFields/CustomInputField";
import CustomDropdown from "../../../components/CustomFields/CustomDropdown";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import ButtonSectionWhiteBg from "../../../components/Buttons/ButtonSectionWhiteBg";
import TextFieldPairWrapper from "../../../components/Wrappers/TextFieldPairWrapper";
import YellowLoader from "../../../components/Loader/YellowLoader";
import { API_BASE_URL } from "../../../../env.config";

const DrivingReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { dispatch } = useRegistrationContext();

  // const updateDlForm = (update) => {
  //   console.log({ ...dl_info, ...update });
  //   dispatch({ type: "UPDATE_DL_INFO", payload: { ...dl_info, ...update } });
  // };

  const documentAIResult = location.state?.documentAIResult;

  const [loader, setLoader] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");
  const [dob, setDOB] = useState("");
  const [sex, setSex] = useState("");

  function parseAddress(fullAddress) {
    const lines = fullAddress.split("\n");
    let address = {
      Address1: "",
      Address2: "",
      City: "",
      State: "",
      ZIP: "",
    };

    if (lines.length === 3) {
      // Address with Address2 component
      address.Address1 = lines[0];
      address.Address2 = lines[1];
      [address.City, address.State, address.ZIP] = lines[2].split(/,?\s+/);
    } else if (lines.length === 2) {
      // Address without Address2 component
      address.Address1 = lines[0];
      [address.City, address.State, address.ZIP] = lines[1].split(/,?\s+/);
    } else {
      // Handle other formats or error
      console.log("Unexpected address format");
    }

    return address;
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleLicenseNumberChange = (event) => {
    setLicenseNumber(event.target.value);
  };
  const handleSexChange = (event) => {
    setSex(event.target.value);
  };
  const handleAddress1Change = (event) => {
    setAddress1(event.target.value);
  };
  const handleAddress2Change = (event) => {
    setAddress2(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleStateChange = (event) => {
    setStateName(event.target.value);
  };
  const handleZipChange = (event) => {
    setZip(event.target.value);
  };

  const handleDOBChange = (event) => {
    setDOB(event.target.value);
  };

  const handleContinueBtnClick = () => {
    setLoader(true);
    const payload = {
      firstName,
      lastName,
      address1,
      address2,
      city,
      stateName,
      zip,
      dob,
      sex,
    };
    console.log("dl payload", payload);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(payload);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${API_BASE_URL}/drivingLicense/createDrivingLicense`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("dl api says", result);
        navigate("/dashboard/registration/insurance");
        setLoader(false);
      })
      .catch((error) => {
        console.error("dl api error", error);
        setLoader(false);
      });
  };

  useEffect(() => {
    if (documentAIResult) {
      const firstNameEntity =
        documentAIResult.frontResult.document.entities.find(
          (entity) => entity.type === "Given Names"
        );
      const lastNameEntity =
        documentAIResult.frontResult.document.entities.find(
          (entity) => entity.type === "Family Name"
        );
      const licenseNumberEntity =
        documentAIResult.frontResult.document.entities.find(
          (entity) => entity.type === "Document Id"
        );
      const addressEntity = documentAIResult.frontResult.document.entities.find(
        (entity) => entity.type === "Address"
      );
      const dobEntity = documentAIResult.frontResult.document.entities.find(
        (entity) => entity.type === "Date Of Birth"
      );
      const sexEntity = documentAIResult.frontResult.document.text;
      setFirstName(firstNameEntity?.mentionText || "");
      setLastName(lastNameEntity?.mentionText || "");
      setLicenseNumber(licenseNumberEntity?.mentionText || "");
      const parsedAddress = parseAddress(addressEntity?.mentionText || "");
      setAddress1(parsedAddress.Address1);
      setAddress2(parsedAddress.Address2);
      setCity(parsedAddress.City);
      setStateName(parsedAddress.State);
      setZip(parsedAddress.ZIP);
      setDOB(dobEntity?.normalizedValue.text || "");
      const sexRegex = /SEX:?\s+([A-Za-z])/;
      const match = sexEntity.match(sexRegex);
      const sex = match ? match[1] : null;
      setSex(sex || "");
    }
  }, [documentAIResult]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_SIDE_STEPPER_HEADING",
      payload:
        "For a prompt completion of your Healthcare details, please upload images of both the front and back of your Identification Information. So you don't have to type in your profile information!",
    });
    dispatch({ type: "UPDATE_STEPPER_PAGE", payload: 1 });
  }, []);

  return (
    <div
      className={`${styles.minSectionHeight} ${styles.xSectionPadding} ${styles.ySectionPadding} flex flex-col items-center gap-5 pb-10`}
    >
      <RegistrationFormHeading heading={"Identification Information"} />
      <span className="w-[90%] max-w-[500px] text-center text-PrimaryGrayText font-medium">
        Please examine the information provided below, as errors may occur
        occasionally due to OCR processing.
      </span>
      <TextFieldPairWrapper>
        <CustomInputField
          label="First Name *"
          placeholder="Enter your first name"
          // value={dl_info.firstName}
          // onChange={(e) => {
          //   updateDlForm({ firstName: e.target.value });
          // }}
          onChange={handleFirstNameChange}
          value={firstName}
        />
        {/* <CustomInputField
          label="Middle Name"
          placeholder="Enter your middle name"
          value={dl_info.middleName}
          onChange={(e) => {
            updateDlForm({ middleName: e.target.value });
          }}
        /> */}
        <CustomInputField
          label="Last Name *"
          placeholder="Enter your last name"
          // value={dl_info.lastName}
          // onChange={(e) => {
          //   updateDlForm({ lastName: e.target.value });
          // }}
          onChange={handleLastNameChange}
          value={lastName}
        />
      </TextFieldPairWrapper>
      <TextFieldPairWrapper>
        <CustomInputField
          label="Address *"
          placeholder="Enter your street address"
          // value={dl_info.address1}
          // onChange={(e) => {
          //   updateDlForm({ address1: e.target.value });
          // }}
          onChange={handleAddress1Change}
          value={address1}
          maxWidth={{ xs: 300, sm: 300, md: 615 }}
        />
        {/* <CustomInputField
          label="City, State, ZIP Code *"
          placeholder="Enter your city, state and ZIP code"
          // value={dl_info.address2}
          // onChange={(e) => {
          //   updateDlForm({ address2: e.target.value });
          // }}
          onChange={handleAddress2Change}
          value={address2}
        /> */}
      </TextFieldPairWrapper>
      <TextFieldPairWrapper>
        <CustomInputField
          label="City *"
          placeholder="Enter your city"
          // value={dl_info.zipCode}
          // onChange={(e) => {
          //   updateDlForm({ zipCode: e.target.value });
          // }}
          value={city}
          onChange={handleCityChange}
        />
        <CustomInputField
          label="State *"
          placeholder="Enter your state name"
          // value={dl_info.licenseNumber}
          // onChange={(e) => {
          //   updateDlForm({ licenseNumber: e.target.value });
          // }}
          onChange={handleStateChange}
          value={stateName}
        />
      </TextFieldPairWrapper>
      <TextFieldPairWrapper>
        <CustomInputField
          label="Zip Code *"
          placeholder="Enter your zip code"
          // value={dl_info.zipCode}
          // onChange={(e) => {
          //   updateDlForm({ zipCode: e.target.value });
          // }}
          value={zip}
          onChange={handleZipChange}
        />
        <CustomInputField
          label="Date of Birth *"
          type="date"
          placeholder=""
          // value={dl_info.dob}
          // onChange={(e) => {
          //   updateDlForm({ dob: e.target.value });
          // }}
          onChange={handleDOBChange}
          value={dob}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </TextFieldPairWrapper>
      <TextFieldPairWrapper>
        <CustomDropdown
          label="Select Sex *"
          // value={dl_info.gender}
          // onChange={(e) => {
          //   updateDlForm({ gender: e.target.value });
          // }}
          onChange={handleSexChange}
          value={sex}
          options={[
            { label: "Male", value: "M" },
            { label: "Female", value: "F" },
            { label: "Other", value: "O" },
          ]}
        />
        <CustomInputField
          label="License Number *"
          placeholder="Enter your license number"
          // value={dl_info.licenseNumber}
          // onChange={(e) => {
          //   updateDlForm({ licenseNumber: e.target.value });
          // }}
          onChange={handleLicenseNumberChange}
          value={licenseNumber}
        />
        {/* <CustomDropdown
          label="Select State"
          value={dl_info.stateName}
          onChange={(e) => {
            updateDlForm({ stateName: e.target.value });
          }}
          options={stateOptions}
        /> */}
      </TextFieldPairWrapper>
      {loader ? (
        <>
          <YellowLoader />
          <span className="font-robotoSlab text-center text-sm text-gray-500">
            Saving your Identification Information
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

export default DrivingReview;
