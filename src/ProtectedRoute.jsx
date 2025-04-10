import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getHostnamePart } from "./Components/SIDEBAR/SIDEBAR_SETTING/ReusableComponents/GlobalHostUrl";

const INACTIVITY_TIMEOUT = 2640000; // 44 minutes
// const INACTIVITY_TIMEOUT = 26400; // 26.4 seconds

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(INACTIVITY_TIMEOUT);

  
  const baseUrl = import.meta.env.VITE_BASE_URL || "localhost"; // Default to localhost
  const port = import.meta.env.VITE_PORT || "5173"; // Default to 5173 if undefined
  const urlChangeBase = import.meta.env.VITE_URLCHANGE_BASE || ""; // Server base URL

console.log("Base URL:", baseUrl); // Debugging
console.log("Port:", port); // Debugging
console.log("urlChangeBase:", urlChangeBase); // Debugging

  //to read url
  const name = getHostnamePart();

  const storedOtp = localStorage.getItem("otp");
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigate("/tenantlogin", { replace: true });
    location.reload();

    }
  },[token, navigate])

  const handleLogout = () => {
    localStorage.removeItem("otp");
    localStorage.removeItem("token");
   
    localStorage.removeItem("logoutTime"); // Clear the stored timestamp

    navigate("/tenantlogin", { replace: true });
    location.reload();


    const baseUrl =
    import.meta.env.MODE === "development"
      ? "localhost" // Development mode
      : import.meta.env.VITE_BASE_URL || "igniculusscrm.com"; // Production mode
  
  const port = import.meta.env.VITE_PORT || "5173"; // Default development port
  const urlChangeBase = import.meta.env.VITE_URLCHANGE_BASE || "igniculusscrm.com"; // Ensure a default value for production
  
  let newUrl =
    baseUrl === "localhost"
      ? `http://${name}.localhost:${port}/tenantlogin` // Development URL
      : `https://${name}.${urlChangeBase}/tenantlogin`; // Production URL
  
  console.log("New URL:", newUrl);
    
  };

  const resetTimer = () => {
    const logoutTime = Date.now() + INACTIVITY_TIMEOUT;

    localStorage.setItem("logoutTime", logoutTime.toString());

    if (timerRef.current) clearTimeout(timerRef.current);

    // Restart interval to update UI
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const remainingTime = Math.max(
        parseInt(localStorage.getItem("logoutTime") || "0", 10) - Date.now(),
        0
      );

      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(intervalRef.current);
        handleLogout();
      }
    }, 1000);
  };

  useEffect(() => {
    if (!storedOtp || storedOtp.length !== 6 || !token) {
      handleLogout();
      return;
    }

    // Retrieve the last stored logout time
    const savedLogoutTime = parseInt(localStorage.getItem("logoutTime") || "0", 10);
    const remainingTime = Math.max(savedLogoutTime - Date.now(), 0);
    setTimeLeft(remainingTime > 0 ? remainingTime : INACTIVITY_TIMEOUT);

    resetTimer();

    const events = ["click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [storedOtp, token, navigate]);

  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = ((timeLeft % 60000) / 1000).toFixed(0);

  console.log(minutes)

  return (
    <>
      
      {children}
    </>
  );
};

export default ProtectedRoute;
