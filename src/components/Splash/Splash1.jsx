import powered from "../../assets/powered.svg";
import slideImg2 from "../../assets/slide_2.png";
import LoginImage from "../ImageComps/LoginImage";

const Splash1 = () => {
  const mainTextStyle =
    "text-3xl  text-green-800 items-center justify-center text-center font-quicksand-sans-serif px-1 pb-1";

  return (
    <div className="w-screen min-h-screen overflow-y-auto flex flex-col justify-center items-center">
      <LoginImage
        src={powered}
        alt="HealthCare Provider placeholder"
        const
        mainTextStyle={mainTextStyle}
      />
      <div className="text-center text-black text-base font-lato font-normal leading-6 break-words">
        Track &amp; manage your appointment
      </div>
      <img src={slideImg2} alt="Logo" className="pt-6" />
    </div>
  );
};

export default Splash1;
