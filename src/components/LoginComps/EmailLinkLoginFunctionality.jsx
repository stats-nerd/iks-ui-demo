import { useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../../config";

const EmailLinkLoginFunctionality = ({
  setSnackbarOpen,
  patientEmail = "",
}) => {
  const [loader, setLoader] = useState(false);
  const [inpError, setInpError] = useState(false);
  const [email, setEmail] = useState(patientEmail);

  const validateInpField = () => {
    if (!email.length) {
      console.log("email not found");
      setInpError(true);
      setSnackbarOpen({
        open: true,
        message: "Please fill in your email address",
        type: "info",
      });
      return;
    }
    if (!(email.includes("@") && email.includes("."))) {
      console.log("email not valid");
      setInpError(true);
      setSnackbarOpen({
        open: true,
        message: "Please enter a valid email",
        type: "error",
      });
      return;
    }
    handleSendEmailLoginLink();
  };

  const handleSendEmailLoginLink = () => {
    console.log(window.location.origin + "/email_link_cross_verification");
    // console.log(window.location);
    setInpError(false);
    setLoader(true);
    const actionCodeSettings = {
      url: window.location.origin + "/email_link_cross_verification",
      handleCodeInApp: true,
    };
    //send sign in link to user email
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("Link sent to your email address!");
        // saves the email for reverification at "/home"
        window.localStorage.setItem("emailForLinkSignIn", email);
        setSnackbarOpen({
          open: true,
          message: "Link sent to your email address!",
          type: "info",
        });
        setLoader(false);
      })
      .catch((error) => {
        console.error("Error sending sign-in link: ", error);
        setSnackbarOpen({
          open: true,
          message: error?.message,
          type: "error",
        });
        setLoader(false);
      });

    //firebase auth call --end
  };

  return (
    <>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        placeholder="abc@xyz.com"
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
        fullWidth
        color="success"
        autoFocus
        sx={{ my: 1 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={inpError}
        inputProps={{
          style: { color: inpError ? "#d32f2f" : "inherit" },
        }}
      />
      {/* <Autocomplete
        id=""
        value={email}
        onChange={(event, newValue) => {
          setEmail(newValue);
        }}
        freeSolo
        options={
          email
            ? email.includes("@")
              ? [
                  email.slice(0, "@") + "@yahoo.com",
                  email.slice(0, "@") + "@gmail.com",
                ]
              : []
            : []
        }
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label="Email"
            variant="outlined"
            type="email"
            placeholder="abc@xyz.com"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            color="success"
            autoFocus
            sx={{ my: 1 }}
            error={inpError}
          />
        )}
      /> */}
      <button
        className={
          loader
            ? "w-full bg-green-300 text-white rounded py-2 text-center px-2 cursor-not-allowed transition font-robotoSlab"
            : "w-full bg-green-400 text-white rounded py-2 text-center px-2 hover:bg-green-500 active:bg-green-500 transition cursor-pointer font-robotoSlab"
        }
        onClick={validateInpField}
        disabled={loader}
      >
        {loader && (
          <CircularProgress size={15} color="inherit" sx={{ mr: 1 }} />
        )}
        {loader ? "Sending..." : "Send Verification Link"}
      </button>
    </>
  );
};

export default EmailLinkLoginFunctionality;
