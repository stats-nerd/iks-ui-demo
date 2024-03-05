import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const ProtectedComponents = ({ children }) => {
  const { appContextState } = useAppContext();
  const { currentAuthUser } = appContextState;

  if (!currentAuthUser) {
    console.log(
      "FROM AUTH PROTECTION: current user not logged in",
      currentAuthUser
    );
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedComponents;
