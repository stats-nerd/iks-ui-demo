const QuesIndicator = ({ currentQuesNumber, totalQuesNumber }) => {
  return (
    <>
      <span className="text-sm text-PrimaryGrayText">
        Question {currentQuesNumber} of {totalQuesNumber}
      </span>
      <span className="text-sm text-PrimaryGrayText">
        This form contains approximately {totalQuesNumber} questions. Just click
        &apos;Continue&apos; to answer them online.
      </span>
    </>
  );
};

export default QuesIndicator;
