import { Outlet, useLocation } from "react-router-dom";
import RegistrationHeader from "../../components/RegistrationComps/RegistrationHeader";
import { RegistrationContextProvider } from "../../context/RegistrationContext";
import styles from "../../styles";

const Registration = () => {
  const location = useLocation();
  return (
    <RegistrationContextProvider>
      <div className={`${styles.minSectionHeight} ${styles.ySectionPadding}`}>
        {location.pathname !== "/dashboard/registration/" &&
          location.pathname !== "/dashboard/registration" && (
            <RegistrationHeader />
          )}
        <Outlet />
      </div>
    </RegistrationContextProvider>
  );
};

export default Registration;
