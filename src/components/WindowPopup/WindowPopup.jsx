import YellowLoader from "../Loader/YellowLoader";

const LoaderWithSubtext = () => (
  <div className="flex flex-col gap-4 items-center justify-center">
    <YellowLoader />
    <span
      className="font-robotoSlab text-center text-white"
      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
    >
      Decrypting your magic url, please wait.
    </span>
  </div>
);

const WindowPopup = ({ showLoader }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[1] bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-lg">
      {showLoader ? (
        <LoaderWithSubtext />
      ) : (
        <div className="w-[80%] max-w-[500px] bg-white border border-red-700 rounded-lg p-5 flex flex-col">
          <span className="w-full text-xl font-robotoSlab font-medium border-b">
            ACCESS DENIED
          </span>
          <span>
            It seems like the magic url that you are trying to access the
            application with is invalid. Please recheck the url and if the
            problem still persists, then contact the Hospital.
          </span>
          <p
            className="text-blue-600 my-2 underline underline-offset-1 cursor-pointer"
            style={{ overflowWrap: "break-word" }}
          >
            {window.location.href}
          </p>
        </div>
      )}
    </div>
  );
};

export default WindowPopup;
