const ButtonSectionGreenBg = ({ buttonName, onClick, className = "" }) => {
  return (
    <button
      type="button"
      className={`bg-[#7ab167] hover:bg-[#6da55b] transition text-white py-3 w-[310px] text-xl rounded cursor-pointer capitalize ${className}`}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default ButtonSectionGreenBg;
