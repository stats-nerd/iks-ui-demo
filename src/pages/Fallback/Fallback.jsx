import { useNavigate } from "react-router-dom";
import { fallbackRouteBg } from "../../assets";

const Fallback = () => {
  const navigate = useNavigate();
  const routeToHomepage = () => navigate("/");
  return (
    <div
      className="bg-cover bg-center min-h-screen px-14 py-20 flex flex-col gap-8"
      style={{ backgroundImage: `url('${fallbackRouteBg}')` }}
    >
      <span className="text-blue-500 font-bold text-6xl lg:text-8xl">
        Unavailable access!
      </span>
      <span className="text-gray-700 text-lg font-light">
        You are trying to access a route which is not available.
      </span>
      <div className="flex items-center gap-1 text-gray-700 text-lg font-light">
        <span
          className="cursor-pointer text-lg underline underline-offset-1 text-blue-900 font-medium"
          onClick={routeToHomepage}
        >
          Click Here
        </span>
        <span>to go back to Homepage</span>
      </div>
    </div>
  );
};

export default Fallback;
