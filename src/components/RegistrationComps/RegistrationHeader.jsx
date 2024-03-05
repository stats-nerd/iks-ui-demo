import { useRegistrationContext } from "../../context/RegistrationContext";
import styles from "../../styles";
import PageIndicator from "./PageIndicator";

const RegistrationHeader = () => {
  const { state } = useRegistrationContext();
  const { currentStepperSideHeading, currentStepperPage } = state;

  return (
    <div
      className={`${styles.xSectionPadding} flex items-center justify-evenly gap-10 border-b pb-10 md:pb-6`}
    >
      <PageIndicator currentPage={currentStepperPage} />
      <p className="hidden md:block w-1/2 text-PrimaryGrayText text-[18px] font-semibold">
        {currentStepperSideHeading}
      </p>
    </div>
  );
};

export default RegistrationHeader;
