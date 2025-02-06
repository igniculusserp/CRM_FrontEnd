import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const storedOtp = localStorage.getItem("otp");
  const token  = localStorage.getItem("token")
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // Function to reset the idle timer
  const resetTimer = () => {
    if (timerRef.current){ 
      clearTimeout(timerRef.current);
    }
      timerRef.current = setTimeout(() => {
      localStorage.removeItem("otp");
      localStorage.removeItem("token");
      navigate("/tenantlogin", { replace: true });
    }, 300000); //5 minutes
  };

  useEffect(() => {
    if (!storedOtp || storedOtp.length !== 6) {
      return;
    }

    // Event listeners to detect user activity
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // Start the idle timer

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [storedOtp]);

  return children;
};

export default ProtectedRoute;
