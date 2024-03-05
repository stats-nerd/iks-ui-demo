import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { MdCamera } from "react-icons/md";

const CameraComponent = ({
  location = {},
  onCapture,
  onClose,
  onSwitchCamera,
}) => {
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(true);

  useEffect(() => {
    // Check if location is not null and location.state is not null before using it
    if (location && location.state && location.state.from) {
      const { from } = location.state;
      console.log("Location:", from);
    } else {
      console.log("Location is null or state.from is null");
    }
  }, [location]);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setShowCamera(false);
  };

  const handleSwitchCamera = () => {
    // Toggle the facingMode between 'user' and 'environment' to switch cameras
    const newFacingMode =
      webcamRef.current.videoConstraints.facingMode === "user"
        ? "environment"
        : "user";

    // Update the videoConstraints
    webcamRef.current.videoConstraints.facingMode = newFacingMode;
    setShowCamera(false);
    setTimeout(() => {
      setShowCamera(true);
    }, 100);
    onSwitchCamera();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{
          facingMode: "environment",
        }}
        className="w-full h-full"
      />

      {/* Close camera button */}
      <div
        className="absolute top-10 right-10 cursor-pointer "
        onClick={onClose}
      >
        <span className="text-white">X</span>
      </div>

      {/* Capture button */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer w-50 h-50 flex justify-center items-center"
        onClick={handleCapture}
      >
        <div className="bg-red-700 brightness-200 rounded-full w-full h-full flex justify-center items-center">
          <MdCamera style={{ fontSize: 40, color: "#eee" }} />
        </div>
      </div>

      {/* Switch camera button */}
    </div>
  );
};

export default CameraComponent;
