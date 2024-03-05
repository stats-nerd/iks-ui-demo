import { poweredImg, slideImg1 } from "../../assets";
import LoginImage from "../ImageComps/LoginImage";

const Splash2 = () => {
  const mainTextStyle =
    "text-3xl  text-green-800 items-center justify-center text-center font-quicksand-sans-serif px-1 pb-1";

  return (
    <div className="w-screen min-h-screen overflow-y-auto flex flex-col justify-center items-center">
      <LoginImage
        src={poweredImg}
        alt="HealthCare Provider placeholder"
        const
        mainTextStyle={mainTextStyle}
      />
      <div className="text-center text-black text-base font-lato font-normal leading-6 break-words pb-3">
        Track &amp; manage your appointment
      </div>
      <img src={slideImg1} alt="Logo" />
    </div>
  );
};

export default Splash2;
