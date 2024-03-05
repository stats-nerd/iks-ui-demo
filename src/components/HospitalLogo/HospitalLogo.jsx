import { useAppContext } from "../../context/AppContext";

const HospitalLogo = ({ alt = "hospital logo", className }) => {
  const { appContextState } = useAppContext();

  return (
    <img
      src={`data:image/png;base64,${appContextState.currentHospitalLogo}`}
      alt={alt}
      className={className}
    />
  );
};

export default HospitalLogo;
