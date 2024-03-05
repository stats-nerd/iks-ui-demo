import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { CiLogout } from "react-icons/ci";
import IconButton from "@mui/material/IconButton";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import styles from "../../../styles";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config";
import { useNavigate } from "react-router-dom";
import HospitalLogo from "../../HospitalLogo/HospitalLogo";
import { useAppContext } from "../../../context/AppContext";

const Navbar = () => {
  const { appContextState } = useAppContext();

  const navigate = useNavigate();
  const [state, setState] = useState({
    right: false,
  });
  let navigateTimeout;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = async () => {
    try {
      // Clear any existing timeouts
      clearTimeout(navigateTimeout);

      await signOut(auth);

      // Delay the execution of the remaining step
      navigateTimeout = setTimeout(() => {
        // Navigate to "DrivingLisenceManual" route
        navigate("/");
      }, 1500);
      // Optional: You can perform additional actions after successful logout
      console.log("User logged out successfully.");
      navigate("/");
    } catch (error) {
      // Handle errors here
      console.error("Error logging out:", error.message);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="h-[90vh] w-full flex flex-col items-center p-2 overflow-y-auto">
        <div className="w-full bg-[#518640] hover:bg-[#669a55] flex items-center justify-center text-white p-4 rounded-lg cursor-pointer transition">
          Registration
        </div>
      </div>
      <div
        className="h-[10vh] border-t border-[#b5cbae] w-full p-5 cursor-pointer text-xl text-[#6ead59] flex items-center justify-center gap-2"
        onClick={handleLogout}
      >
        <CiLogout color="#6ead59" /> Logout
      </div>
    </Box>
  );

  return (
    <div>
      <div
        className={`w-full bg-PrimaryGreenLighter py-6 ${styles.xSectionPadding}`}
      >
        <div className="w-full flex items-center justify-between">
          <HospitalLogo
            alt="navbar logo"
            className={`w-[10rem] object-cover max-w-[100px] ${
              !appContextState?.currentHospitalLogo && "invisible"
            }`}
          />
          <IconButton
            onClick={toggleDrawer("right", true)}
            data-testid="hamburger-menu-button"
          >
            <RxHamburgerMenu color="#7AB167" size={32} />
          </IconButton>
        </div>
      </div>

      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
};

export default Navbar;
