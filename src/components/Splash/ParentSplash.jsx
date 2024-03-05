import { useRef, useState, useEffect } from "react";
import Splash1 from "./Splash1";
import Splash2 from "./Splash2";
import Splash3 from "./Splash3";

const ParentSplash = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    overflowY: "hidden",
  };

  const [activeSplash, setActiveSplash] = useState(1);
  const parentRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      const container = parentRef.current;

      // Check if the container is available
      if (container) {
        // horizontal scrolling
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          if (event.deltaX > 0) {
            setActiveSplash((prev) => Math.min(prev + 1, 3));
          } else {
            setActiveSplash((prev) => Math.max(prev - 1, 1));
          }

          // Prevent default horizontal scrolling behavior
          event.preventDefault();
        }
      }
    };

    // Check if the container is available before adding the event listener
    if (parentRef.current) {
      parentRef.current.addEventListener("wheel", handleWheel);
    }

    // Auto-switch every 5 seconds
    const intervalId = setInterval(() => {
      setActiveSplash((prev) => (prev % 3) + 1);
    }, 3000);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(intervalId);

      // Check if the container is available before removing the event listener
      if (parentRef.current) {
        parentRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div
      className="w-screen min-h-screen overflow-y-hidden flex flex-col items-center"
      style={containerStyle}
      ref={parentRef}
      data-testid="parent-container"
    >
      <div style={{ flex: 1 }}>
        {activeSplash === 1 && <Splash1  data-testid="splash1"/>}
        {activeSplash === 2 && <Splash2  data-testid="splash2"/>}
        {activeSplash === 3 && <Splash3  data-testid="splash3"/>}
      </div>
    </div>
  );
};

export default ParentSplash;
