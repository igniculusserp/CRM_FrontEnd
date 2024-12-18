import { useEffect } from "react";
import { requestPermission, listenForMessages } from "./firebase.jsx";
import VerifyTenant from "./Components/REGISTRATION/VerifyTenant.jsx"; // Example component
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const token = await requestPermission();
        console.log("FCM Token:", token);

        // Start listening for foreground messages
        listenForMessages();
      } catch (error) {
        console.error("Permission request failed:", error);
      }
    };

    setupNotifications();
  }, []);

  return (
    <div>
      <ToastContainer />
      <VerifyTenant />
    </div>
  );
}

export default App;
