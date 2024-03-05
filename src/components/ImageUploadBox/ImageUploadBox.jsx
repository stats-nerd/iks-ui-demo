import { useState } from "react";
import { cameraIcon, sampleDL } from "../../assets";
import ChooseFile from "../ChooseFile/ChooseFile";
import { CiCamera } from "react-icons/ci";

const ImageUploadBox = ({ imageType, img, setImageDL, onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSelectedFileName(file.name);
      };
      reader.readAsDataURL(file);
      console.log(file);
      setImageDL(file);
    }
  };

  const handleChooseAnotherImage = () => {
    // Reset the selected image state when choosing another image
    setSelectedImage(null);
    setSelectedFileName(null);
    setImageDL(null);
  };

  return (
    <>
      <div className="text-xs mt-3 text-gray-600 flex justify-start w-301">
        {imageType}
      </div>
      <div
        className="mt-1 "
        style={{
          position: "relative",
          width: "310px",
          height: "195px",
          border: "1px solid rgb(204, 204, 204)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundImage: `linear-gradient(rgba(2, 3, 4, 0.5), rgba(2, 3, 4, 0.5)),url(${sampleDL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        ) : (
          <label
            htmlFor="imageInput"
            className="flex flex-col items-center justify-center h-full"
          >
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <CiCamera color="white" className="cursor-pointer text-[50px]" />
            {/* <img
              src={cameraIconWhite}
              alt="Italian Trulli"
            ></img> */}
          </label>
        )}

        {selectedImage && (
          <button
            onClick={handleChooseAnotherImage}
            className="absolute bottom-0 right-0 border-none rounded-4 cursor-pointer"
          >
            <img
              src={cameraIcon}
              alt="Italian Trulli"
              className="h-12 w-11 bg-white rounded-tl-23 rounded-br-20 opacity-80"
            />
          </button>
        )}
      </div>
      <br />
      {/* Choose File Section */}
      <ChooseFile
        handleImageChange={handleImageChange}
        selectedFileName={selectedFileName}
      />
    </>
  );
};

export default ImageUploadBox;
