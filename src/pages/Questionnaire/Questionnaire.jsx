import { Outlet } from "react-router-dom";
import QuesHeader from "../../components/QuestionnaireComps/QuesHeader/QuesHeader";
import styles from "../../styles";
import { QuestionnaireContextProvider } from "../../context/QuestionnaireContext";

const Questionnaire = () => {
  return (
    <QuestionnaireContextProvider>
      <div className={`${styles.minSectionHeight} ${styles.ySectionPadding}`}>
        <QuesHeader />
        <Outlet />
      </div>
    </QuestionnaireContextProvider>
  );
};

export default Questionnaire;
