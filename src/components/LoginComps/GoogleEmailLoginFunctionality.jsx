import { useNavigate } from "react-router-dom";
import { auth } from "../../../config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleImg } from "../../assets";

const GoogleEmailLoginFunctionality = ({ setSnackbarOpen }) => {
  const navigate = useNavigate();
  const SignUpUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("g sign in result:", result);
        navigate("/dashboard/registration");
      })
      .catch((error) => {
        console.log("g sign in error:", error);
        setSnackbarOpen({
          open: true,
          message: "Error occurred while signing in from Google account",
          type: "error",
        });
      });
  };

  const handleGoogleSignIn = () => {
    SignUpUsingGoogle();
  };

  return (
    <img
      src={GoogleImg}
      alt="google login"
      className="w-10 cursor-pointer hover:shadow-md hover:shadow-slate-300 rounded-full transition"
      onClick={handleGoogleSignIn}
    />
  );
};

export default GoogleEmailLoginFunctionality;
