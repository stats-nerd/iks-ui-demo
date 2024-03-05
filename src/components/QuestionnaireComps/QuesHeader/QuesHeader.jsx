import styles from "../../../styles";
import QuesPageIndicator from "../QuesPageIndicator/QuesPageIndicator";

const QuesHeader = () => {
  let currentStepperSideHeading =
    "If you fill out the information using our app now, you'll enjoy the convenience of not having to re-enter these details in the future.";
  return (
    <div
      className={`${styles.xSectionPadding} flex items-center justify-around border-b pb-10 md:pb-6`}
    >
      <QuesPageIndicator
        currentPage={
          localStorage.getItem("questionnaireType") === "SDOH" ? 1 : 2
        }
      />
      <p className="hidden md:block w-[60%] text-PrimaryGrayText text-[18px] font-semibold">
        {currentStepperSideHeading}
      </p>
    </div>
  );
};

export default QuesHeader;
