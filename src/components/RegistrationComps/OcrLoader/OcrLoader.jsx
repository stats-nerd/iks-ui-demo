import YellowLoader from "../../Loader/YellowLoader";

const OcrLoader = () => {
  return (
    <div className="mt-2 flex flex-col justify-center items-center">
      <YellowLoader />
      <span className="text-[#6D6760]">Please Wait</span>
      <span className="text-[#6D6760]">OCR processing in progress</span>
    </div>
  );
};

export default OcrLoader;
