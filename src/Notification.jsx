import { useState, useEffect } from "react";
import { requestPermission, onMessageListener } from "./firebase";
import { ToastContainer } from "react-toastify";
import { showInfoToast } from "./utils/toastNotifications";

export default function Notification() {
  const [notification, setNotification] = useState({
    title: "",
    body: ""
  });

  useEffect(() => {
    requestPermission();

    const listenForMessages = () => {
      const unsubscribe = onMessageListener()
        .then(payload => {
          console.log('Received payload:', payload); // Debugging line
    
          if (payload && payload.notification) {
            const { title, body } = payload.notification;
    
            setNotification({ title, body });
            showInfoToast(`${title}: ${body}`);
          } else {
            console.warn("Payload is missing notification data:", payload);
          }
        })
        .catch(err => console.log("Notification error: ", err));
        
      return unsubscribe; 
    };

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <>
      <ToastContainer />
    </>
  );
}
