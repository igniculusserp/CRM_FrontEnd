import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//45 minutes 
const INACTIVITY_TIMEOUT = 2700000; 
// const INACTIVITY_TIMEOUT = 27000; 

const ProtectedRoute = ({ children }) => {

  const navigate = useNavigate();
  const timerRef = useRef(null);

  const storedOtp = localStorage.getItem("otp");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("otp");
    localStorage.removeItem("token");
    navigate("/tenantlogin", { replace: true });
    location.reload();
    console.log('logout hitted')
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      console.log('bounce')
    }
    timerRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
    
  };


  useEffect(() => {
    if (!storedOtp || storedOtp.length !== 6 || !token) {
      handleLogout();
      return;
    }

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));


    resetTimer();
    
    
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current){ 
        clearTimeout(timerRef.current)
      }
    };
  }, [storedOtp, token, navigate]);


  return children;
};

export default ProtectedRoute;