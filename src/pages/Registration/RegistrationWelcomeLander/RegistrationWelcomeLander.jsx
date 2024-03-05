import { useNavigate } from "react-router-dom";
import styles from "../../../styles";
import ButtonSectionGreenBg from "../../../components/Buttons/ButtonSectionGreenBg";
import { doctor_group } from "../../../assets";
import { useAppContext } from "../../../context/AppContext";

const RegistrationWelcomeLander = () => {
  const navigate = useNavigate();
  const { appContextState } = useAppContext();

  const handleContinueBtnClick = () => {
    navigate("/dashboard/registration/dl");
  };

  return (
    <div
      className={`${styles.xSectionPadding} ${styles.ySectionPadding} ${styles.minSectionHeight} flex justify-center`}
    >
      <div className="w-full max-w-[600px] flex flex-col items-center justify-center gap-3 pb-10">
        <img
          src={doctor_group}
          alt="doc group image"
          className="w-[70%] md:w-[50%] object-cover"
        />
        <span className="text-PrimaryGreen font-medium text-2xl font-robotoSlab">
          Welcome
        </span>
        <span className="text-PrimaryGreen font-medium text-xl font-robotoSlab -mt-3">
          {appContextState?.patientInfo?.patientName}
        </span>
        <span className="font-semibold text-[18px] md:text-[22px] font-robotoSlab text-center text-gray-800">
          Ready to say goodbye to the hassle of entering manually information
          details? Please set-up your Secured Medical Profile. You will need
          your Insurance Card, Driver’s License and payment information
          available to proceed.
        </span>
        <ButtonSectionGreenBg
          buttonName={"continue"}
          onClick={handleContinueBtnClick}
        />
      </div>
    </div>
  );
};

export default RegistrationWelcomeLander;
