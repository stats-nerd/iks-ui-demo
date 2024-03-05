import { poweredImg, slideImg3 } from "../../assets";
import LoginImage from "../../components/ImageComps/LoginImage";

const Splash3 = () => {
  return (
    <div className="w-screen min-h-screen overflow-y-auto flex flex-col justify-center items-center">
      <LoginImage src={poweredImg} alt="HealthCare Provider placeholder" />
      <div className="text-center text-black text-base font-lato font-normal leading-6 break-words pb-3">
        Track &amp; manage your appointment
      </div>
      <img className={"py-2"} src={slideImg3} alt="Logo" />
    </div>
  );
};

export default Splash3;
