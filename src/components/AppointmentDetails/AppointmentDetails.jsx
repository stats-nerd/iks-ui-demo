// AppointmentDetails.js
import { Rating } from "@mui/material";

const AppointmentDetails = ({
  doctorName,
  specialty,
  dateTime,
  patientName,
  appointmentType,
  ratingValue,
}) => {
  return (
    <div className="w-full max-w-[500px] h-[163px] p-5 bg-PrimaryGreenLighter rounded-[10px] border border-lime-200 flex-col justify-start items-center inline-flex">
      <div className="self-stretch h-[123px] flex-col justify-start items-center gap-2.5 flex">
        <div className="self-stretch h-[46px] flex-col justify-start items-center gap-[5px] flex">
          <div className="justify-center items-center gap-[15px] inline-flex">
            <div className="text-lime-900 text-lg font-normal font-['Lato']">
              {doctorName}
            </div>
            {/* Display the Rating component on the right of the doctor's name */}
            {ratingValue && (
              <Rating name="read-only" value={ratingValue} readOnly />
            )}
          </div>
          <div className="text-lime-900 text-sm font-normal font-['Lato'] leading-[19px]">
            {specialty}
          </div>
        </div>
        <div className="self-stretch h-[67px] flex-col justify-start items-center gap-[5px] flex">
          <div className="self-stretch text-center text-stone-500 text-base font-semibold font-['Lato']">
            Date & Time: {dateTime}
          </div>
          <div className="self-stretch text-center text-stone-500 text-base font-normal font-['Lato']">
            Patient: {patientName}
          </div>
          <div className="self-stretch text-center text-stone-500 text-base font-normal font-['Lato']">
            Appointment type: {appointmentType}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
