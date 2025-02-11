import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// 45 minutes
const INACTIVITY_TIMEOUT = 2700000; 

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
    navigate("/tenantlogin", { replace: true });
    location.reload();
    console.log("logout hitted");
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
    
    // Reset countdown timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setTimeLeft(INACTIVITY_TIMEOUT);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!storedOtp || storedOtp.length !== 6 || !token) {
      handleLogout();
      return;
    }

    // const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    const events = [ "click", ];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [storedOtp, token, navigate]);

  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = ((timeLeft % 60000) / 1000).toFixed(0);

  return (
    <>
      <div>
        <p>Time left before auto logout: {minutes}m {seconds}s</p>
      </div>
      {children}
    </>
  );
};

export default ProtectedRoute;
