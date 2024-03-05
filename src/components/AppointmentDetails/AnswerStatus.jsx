import { VscDash } from "react-icons/vsc";

const AnswerStatus = ({ answered, total }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <div
        className={`rounded-full border ${
          answered === total
            ? "text-green-700 border-green-700"
            : "text-red-700 border-red-700"
        } font-bold text-center text-xs py-[0.5px] px-[0.5px] flex items-center justify-center`}
      >
        <VscDash />
      </div>
      <div
        className={`${
          answered === total ? "text-green-700" : "text-red-700"
        } text-sm font-semibold font-['Lato']`}
      >
        Answered {answered} of {total}
      </div>
    </div>
  );
};

export default AnswerStatus;
