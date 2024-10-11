import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "./../utils/toastNotifications";
import { main_base_url } from "./../Config/config";

// Create the OTP context
const OTPContext = createContext();

//custom-Hook
export const useOTP = () => useContext(OTPContext);

// Provider 
export const OTPProvider = ({ children }) => {

    //OTPinput
    const [otp, setOtp] = useState("");
    //resendButton
    const [resendDisabled, setResendDisabled] = useState(false);  

    //counting
    const [countdown, setCountdown] = useState(120);

    // //emailInput
    // const [email, setEmail] = useState("");

//   // Fetch email from localStorage
//   useEffect(() => {
//     const storedEmail = localStorage.getItem("myData_forget");
//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else {
//       console.error("Email is not available in localStorage.");
//     }
//   }, []);

  // Countdown logic for OTP resend
  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 120;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);


  // Resend OTP functionilty 
const handleResend = async () => {
    try {
      const storedEmail = localStorage.getItem("myData_forget");
      if (!storedEmail) {
        throw new Error("Email not found");
      }
      
      const response = await axios.post(`${main_base_url}/Users/send/otp`, {
        Email: storedEmail,
      });
  
      if (response.data.status === 200) {
        setResendDisabled(true);
        showSuccessToast("OTP Sent");
      } else {
        showErrorToast("Failed To Send OTP");
      }
    } catch (error) {
      console.error("Error:", error);
      showErrorToast("Failed to resend OTP: " + error.message);
    }
  };
  

  // OTP value change handler
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <OTPContext.Provider
      value={{
        otp,
        setOtp,
        resendDisabled,
        countdown,
        handleResend,
        handleChange,
      }}
    >
      {children}
    </OTPContext.Provider>
  );
};
