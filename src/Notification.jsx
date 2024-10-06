import { useState, useEffect } from "react";
import { requestPermission, onMessageListener } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

          // Show default toast notification for Firebase messages
          showDefaultToast(payload);
        })
        .catch(err => console.log("Notification error: ", err));
    };

    listenForMessages();

    return () => {
    };
  }, []);

  const showDefaultToast = (payload) => {
    const title = payload?.notification?.title || "Notification";
    const body = payload?.notification?.body || "You have a new message.";
    
    toast.info(`${title}: ${body}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <ToastContainer />
    </>
  );
}
