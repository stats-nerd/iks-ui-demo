import React from "react";
import OnlineFormIcon from "../../assets/IconOnlineform.svg";
const OnlineFormBox = () => {
  return (
    <div className="w-[220px] h-[278px] px-5 py-[30px] bg-PrimaryGreenLighter rounded-[10px] border border-stone-400 flex-col justify-start items-center inline-flex">
      <div className="self-stretch h-[218px] flex-col justify-start items-center gap-2.5 flex">
        <div className="self-stretch h-[73px] flex-col justify-start items-center gap-[5px] flex">
          <div className="justify-center items-center gap-[15px] inline-flex">
            <div className="text-center text-lime-900 text-base font-normal font-['Roboto Slab'] leading-[21px]">
              Fill the form
            </div>
          </div>
          <div className="justify-center items-center gap-[15px] inline-flex">
            <div className="text-center text-lime-900 text-base font-normal font-['Roboto Slab'] leading-[21px]">
              Online
            </div>
          </div>
          <div />
        </div>

        <div className="self-stretch h-[135px] py-5 flex-col justify-start items-center gap-[5px] flex">
          <img src={OnlineFormIcon} alt="Download Icon" />

          <div className="w-[93.03px] h-[95px] relative" />
        </div>
      </div>
    </div>
  );
};

export default OnlineFormBox;
