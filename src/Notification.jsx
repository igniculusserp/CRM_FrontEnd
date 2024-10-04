import { useState, useEffect } from "react";
import { requestPermission, onMessageListener } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

export default function Notification() {
  const [notification, setNotification] = useState({
    title: "",
    body: ""
  });

  useEffect(() => {
    // Request notification permission when the component mounts
    requestPermission();

    const listenForMessages = () => {
      onMessageListener()
        .then(payload => {
          setNotification({
            title: payload?.notification?.title,
            body: payload?.notification?.body
          });

          // Show toast notification
          toast.info(`${payload?.notification?.title}: ${payload?.notification?.body}`);
        })
        .catch(err => console.log("Notification error: ", err));
    };

    listenForMessages();

    // Clean up function (if required for future unsubscriptions)
    return () => {
      // Unsubscribe logic here, if needed
    };
  }, []);

  return (
    <>
      <ToastContainer />
    </>
  );
}
