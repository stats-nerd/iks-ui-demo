import { useState } from "react";
import CameraComponent from "../CameraComponent/CameraComponent";
import { cameraIcon, cameraIconWhite, sampleDL } from "../../assets";

const ImageCaptureBox = ({ imageType, setImageDL }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = (imageSrc) => {
    setCapturedPhoto(imageSrc);
    setSelectedImage(imageSrc);
    console.log("image src before dumping in state", imageSrc);
    setImageDL(imageSrc);
    setShowCamera(false);
  };

  const handleChooseAnotherImage = () => {
    setImageDL(null);
    setCapturedPhoto(null);
    setSelectedImage(null);
    setShowCamera(false);
  };

  const handleCameraClick = () => {
    setShowCamera(true);
  };

  return (
    <>
      <div
        className="text-xs mt-3"
        style={{
          color: "rgb(19, 13, 96)",
          display: "flex",
          justifyContent: "flex-start",
          width: "31px",
        }}
      >
        {imageType}
      </div>
      <div
        className="-mt-2"
        style={{
          position: "relative",
          width: "31px",
          height: "195px",
          border: "1px solid rgb(24, 24, 24)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundImage: `linear-gradient(rgba(2, 3, 4, .5), rgba(2, 3, 4, .5)),url(${sampleDL})`, // Use the imported image variable
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Optional: Adjust based on your requirements
        }}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-full object-cover"
          />
        ) : (
          <div>
            {showCamera && (
              <CameraComponent
                onCapture={handleCapture}
                onClose={() => setShowCamera(false)}
                onSwitchCamera={() => {}}
              />
            )}

            {!showCamera && (
              <div className="absolute inset- flex justify-center items-center border-none rounded-4 cursor-pointer">
                <button onClick={handleCameraClick}>
                  <img
                    src={cameraIconWhite}
                    alt="Capture"
                    className="h-8 w-8"
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {selectedImage && (
          <button
            onClick={handleChooseAnotherImage}
            className="absolute bottom- right- border-none rounded-4 cursor-pointer"
          >
            <img
              src={cameraIcon}
              alt="Italian Trulli"
              className="h-8 w-8 bg-white rounded-tl-8 rounded-br-8 opacity-8"
            />
          </button>
        )}
      </div>
    </>
  );
};

export default ImageCaptureBox;
