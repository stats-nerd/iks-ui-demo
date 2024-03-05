import ButtonSectionWhiteBg from "../../Buttons/ButtonSectionWhiteBg";

const BelowSection = ({ manuallyBtnClickFunc }) => {
  return (
    <>
      <span className="text-gray-500 text-sm font-medium my-2 md:my-0">or</span>
      <ButtonSectionWhiteBg
        buttonName="Enter Manually"
        onClick={manuallyBtnClickFunc}
      />
      <div className="w-full my-4 md:my-0 flex items-center justify-center gap-10 pl-[40px] md:pl-[60px]">
        <span className="text-xs md:text-base text-PrimaryGreen underline underline-offset-4 cursor-pointer">
          I will do this later
        </span>
        <span className="text-xs md:text-base text-PrimaryGreen">|</span>
        <span className="text-xs md:text-base text-PrimaryGreen underline underline-offset-4 cursor-pointer">
          Why are we asking these?
        </span>
      </div>
    </>
  );
};

export default BelowSection;
