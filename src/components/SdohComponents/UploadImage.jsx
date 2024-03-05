import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import UploadIcon from "../../assets/Iconuploadbig.svg";

const UploadImage = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles([...files]);

    const names = Array.from(files).map((file) => file.name);
    setFileNames(names);
    onUpload([...files], names);
  };

  const handleDeleteFile = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedNames = [...fileNames];

    updatedFiles.splice(index, 1);
    updatedNames.splice(index, 1);

    setSelectedFiles(updatedFiles);
    setFileNames(updatedNames);
    onUpload(updatedFiles, updatedNames);
  };

  const getShortenedName = (name) => {
    if (name.length > 18) {
      return name.substr(0, 18) + "...";
    }
    return name;
  };

  return (
    <div>
      <div className="pt-10  w-[220px] h-[336px] flex-col justify-start items-start gap-[15px] inline-flex relative mb-5">
        <div className="w-full h-[280px] bg-PrimaryGreenLighter rounded-[10px] border border-stone-400 flex-col justify-start items-center inline-flex relative">
          {selectedFiles.length > 0 && (
            <>
              <img
                src={URL.createObjectURL(
                  selectedFiles[selectedFiles.length - 1]
                )}
                alt={`Preview-${selectedFiles.length}`}
                className="w-full h-[336px] object-cover rounded-[10px]"
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white bg-green-800 rounded-tl-md p-1">
                <VisibilityIcon fontSize="small" />
                <span>{selectedFiles.length}</span>
              </div>
            </>
          )}
          {selectedFiles.length === 0 && (
            <div className="self-stretch h-[318px] flex-col justify-start items-center gap-2.5 flex">
              <div className="self-stretch h-[73px] flex-col justify-start items-center gap-[5px] flex">
                <div className="justify-center items-center gap-[15px] inline-flex">
                  <div className="text-center text-lime-900 text-base font-normal font-['Roboto Slab'] pt-8 leading-[21px]">
                    Upload the{" "}
                  </div>
                </div>
                <div className="justify-center items-center gap-[15px] inline-flex">
                  <div className="text-center text-lime-900 text-base font-normal font-['Roboto Slab'] leading-[21px]">
                    Form Image
                  </div>
                </div>
                <div />
              </div>
              <div className="self-stretch h-[135px] py-5 flex-col justify-start items-center gap-[5px] flex">
                <img src={UploadIcon} alt="UploadIcon" />
              </div>
            </div>
          )}
        </div>
        {selectedFiles.length > 0 && (
          <div>
            {fileNames.map((name, index) => (
              <div
                key={index}
                className="flex justify-between items-center mt-2"
              >
                <div className="w-[220px] bg-PrimaryGreenLighter rounded-lg border border-stone-400 justify-between items-center inline-flex ">
                  {getShortenedName(name)}

                  <div
                    className="cursor-pointer px-[15px] py-4  rounded-tr-md rounded-br-md border justify-center items-center gap-2.5 flex text-green-400"
                    onClick={() => handleDeleteFile(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedFiles.length === 0 && (
          <button>
            <div className="w-[220px] bg-PrimaryGreenLighter rounded-lg border border-stone-400 justify-between items-center inline-flex mt-1">
              <div className="grow shrink basis-0 h-[19px] pl-[15px] justify-start items-center flex">
                <div className="text-gray-400 text-base font-normal font-['Lato']">
                  File Name
                </div>
              </div>
              <div
                className="px-[15px] py-3 bg-lime-800 rounded-tr-md rounded-br-md border border-lime-950 justify-center items-center gap-2.5 flex"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <div className="text-white text-base font-normal font-['Lato']">
                  Choose
                </div>
              </div>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
