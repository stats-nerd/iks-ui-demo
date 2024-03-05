import { useAppContext } from "../../context/AppContext";

const WelcomeSecContent = ({ welcomeText }) => {
  const { appContextState } = useAppContext();

  return (
    <>
      <p className="hidden md:block text-3xl  text-green-800 items-center justify-center text-center my-1">
        {welcomeText}
      </p>
      <p className="hidden md:block text-2xl  text-green-800">
        {appContextState?.patientInfo?.patientName}
      </p>
    </>
  );
};

export default WelcomeSecContent;
