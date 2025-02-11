import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const INACTIVITY_TIMEOUT = 2640000; // 44 minutes

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(INACTIVITY_TIMEOUT);

  const storedOtp = localStorage.getItem("otp");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("otp");
    localStorage.removeItem("token");
    localStorage.removeItem("logoutTime"); // Clear the stored timestamp

    navigate("/tenantlogin", { replace: true });
    location.reload();

    
    //localhost
    const newUrl = `http://${data.name}.localhost:5173/tenantlogin`;
    
    // For Server
    // const newUrl = `http://${data.name}.${urlchange_base}/tenantlogin `;
    window.location.href = newUrl;

    console.log("logout triggered");
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

  return (
    <>
      
      {children}
    </>
  );
};

export default ProtectedRoute;
