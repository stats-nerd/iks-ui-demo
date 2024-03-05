import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import {
  slideImg2,
  slideImg1,
  slideImg3,
  iksLogo,
  medicalCenterLogo,
} from "../../assets";
import { useEffect } from "react";
import { auth } from "../../../config";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import YellowLoader from "../Loader/YellowLoader";

const EmailLinkCrossVerificationLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("current auth state from home", auth.currentUser);
    if (localStorage.getItem("emailForLinkSignIn")) {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // This can be used to continue the user's intended action before triggering the sign-in operation.
        // Get the email if available. This should be available if the user completes the flow on the same device where they started it.

        let email = window.localStorage.getItem("emailForLinkSignIn");

        if (!email) {
          // User opened the link on a different device. To prevent session fixation attacks, ask the user to provide the associated email again.
          email = window.prompt(
            "Seems like you have used a different browser/device for logging in. Please re-enter your email for confirmation"
          );
          window.localStorage.setItem("emailForLinkSignIn", email);
        }

        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            // Clear email from storage since the auth session must have been updated with user details
            localStorage.removeItem("emailForLinkSignIn");
            console.log(result);
            navigate("/dashboard/registration");
          })
          .catch((error) => {
            // Common errors could be invalid email and invalid or expired OTPs.
            console.log(error);
          });
      } else {
        localStorage.removeItem("emailForLinkSignIn");
        navigate("/dashboard/registration");
      }
    } else if (!auth.currentUser) {
      localStorage.removeItem("emailForLinkSignIn");
      navigate("/EmailVerification");
    } else {
      localStorage.removeItem("emailForLinkSignIn");
      navigate("/dashboard/registration");
    }
  }, []);

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col justify-center items-center">
      <div className="w-full max-w-md flex flex-col justify-center items-center p-10 gap-5">
        <img
          src={medicalCenterLogo}
          alt="logo"
          className="w-[13rem] lg:w-[15rem] object-cover"
        />
        <Swiper slidesPerView={1} autoplay className="w-[75%] lg:w-[90%]">
          <SwiperSlide>
            <img
              src={slideImg1}
              alt="login"
              className="w-[19rem] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slideImg3}
              alt="login"
              className="w-[19rem] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={slideImg2}
              alt="login"
              className="w-[16rem] object-cover"
            />
          </SwiperSlide>
        </Swiper>
        <YellowLoader />
        <span>Preparing Dashboard...</span>
        <img src={iksLogo} alt="eks" className=" object-cover" />
      </div>
    </div>
  );
};

export default EmailLinkCrossVerificationLoader;
