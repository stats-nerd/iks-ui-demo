import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles";

const DashboardLander = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/registration");
  }, []);
  return (
    <div
      className={`${styles.xSectionPadding} ${styles.ySectionPadding} ${styles.minSectionHeight}`}
    >
      Redirecting...
    </div>
  );
};

export default DashboardLander;
