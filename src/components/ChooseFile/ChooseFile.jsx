const ChooseFile = ({ handleImageChange, selectedFileName }) => {
  const maxLength = 15;

  const displayedFileName =
    selectedFileName && selectedFileName.length > maxLength
      ? `${selectedFileName.substring(0, maxLength)}...${selectedFileName.slice(
          -4
        )}`
      : selectedFileName;

  return (
    // <label className="w-full bg-green-100 border border-green-500 rounded-md flex justify-between items-center cursor-pointer">
    //   {/* Left Section */}
    //   {/* <div className="flex-1 h-19 pl-4 flex justify-start items-center">
    //     <div className="text-gray-600 text-base font-lato font-normal break-words">
    //       {displayedFileName || "File Name"}
    //     </div>
    //   </div> */}

    //   {/* Right Section */}
    //   <div className="px-4 py-3 bg-green-700 border-green-700 border-t-2 border-l-2 border-r-2 rounded-tl-6 rounded-tr-8 flex justify-center items-center gap-10">
    //     <div className="text-white text-base font-lato font-normal break-words">
    //       Choose
    //     </div>
    //     {/* File Input */}
    //     <input
    //       type="file"
    //       accept="image/*"
    //       style={{ display: "none" }}
    //       onChange={handleImageChange}
    //     />
    //   </div>
    // </label>
    <label className="px-4 py-3 bg-[#7ab167] hover:bg-[#6da55b] border-t-2 border-l-2 border-r-2 rounded-tl-6 rounded-tr-8 flex justify-center items-center gap-10 mb-3">
      <div className="text-white text-base font-lato font-normal break-words">
        Choose
      </div>
      {/* File Input */}
      <input type="file" accept="image/*" hidden onChange={handleImageChange} />
    </label>
  );
};

export default ChooseFile;
