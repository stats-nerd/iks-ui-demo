const RegistrationFormHeading = ({ heading, fontSize = "34px" }) => {
  return (
    <span
      className={`text-PrimaryDarkGreenText text-center capitalize leading-10 font-normal text-[${fontSize}]`}
    >
      {heading}
    </span>
  );
};

export default RegistrationFormHeading;
