import Rating from "@mui/material/Rating";
import EventIcon from "@mui/icons-material/Event";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useNavigate } from "react-router-dom";

const Card = ({ doctor }) => {
  const navigate = useNavigate();

  const { name, photo, rating, type, dateTime, forms } = doctor;

  const [date, time] = dateTime.split("T");

  return (
    <div className="relative w-[280px] mx-auto p-4 bg-PrimaryGreenLighter rounded-md shadow-md mt-8 border border-[#6da55b] ">
      <div className="flex items-center justify-center mb-4">
        <div className="w-32 h-32 overflow-hidden rounded-full">
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-lg font-bold mb-2 text-green-900">{name}</h1>
        <Rating name="rating" value={rating} precision={0.5} readOnly />
        <p className="text-green-900">{type}</p>
        <div className="flex items-center justify-center text-gray-600 relative pb-2">
          <EventIcon className="text-green-700 mr-1" />
          <p className="font-semibold text-black">{date}</p>
          <ScheduleIcon className="text-green-700 ml-4 mr-1 font-['Roboto Slab']" />
          <p className="font-semibold text-black font-['Roboto Slab']">
            {time}
          </p>
        </div>
      </div>
      <br />
      {forms[0]?.isFormCompleted ? (
        <div
          className={`cursor-pointer absolute rounded-b bottom-0 left-0 right-0 h-9 mt-4 ${
            forms[1]?.isFormCompleted ? "bg-[#6da55b] " : "bg-[#c53b00]"
          }`}
        >
          <p
            className="text-white text-[12px] text-center mt-2"
            onClick={() => {
              navigate("/dashboard/confirmAppointment", {
                state: {
                  appointmentConfirmed: true,
                },
              });
              // if (!forms[1]?.isFormCompleted)
            }}
          >
            {forms[1]?.isFormCompleted
              ? `${forms[1].formName} completed`
              : `Please complete ${forms[1].formName}`}
          </p>
        </div>
      ) : (
        <div
          className={`cursor-pointer absolute rounded-b bottom-0 left-0 right-0 h-9 mt-4 ${
            forms[0]?.isFormCompleted ? "bg-[#6da55b] " : "bg-[#c53b00]"
          }`}
        >
          <p
            className="text-white text-[12px] text-center mt-2"
            onClick={() => {
              navigate("/dashboard/confirmAppointment", {
                state: {
                  appointmentConfirmed: true,
                },
              });
              // if (!forms[0]?.isFormCompleted)
            }}
          >
            {forms[0]?.isFormCompleted
              ? `${forms[0].formName} completed`
              : `Please complete ${forms[0].formName}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
