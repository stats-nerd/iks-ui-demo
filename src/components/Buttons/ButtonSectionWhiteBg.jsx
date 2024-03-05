const ButtonSectionWhiteBg = ({ buttonName, onClick, className = "" }) => {
  return (
    <button
      className={`w-[310px] h-[50px] p-1 rounded-7 border-[#7ab167] border-2 rounded-md font-lato leading-5 text-[#7ab167] ${className}`}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default ButtonSectionWhiteBg;
