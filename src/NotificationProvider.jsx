// NotificationProvider.jsx
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationProvider = ({ children }) => {
  useEffect(() => {
    // Manually register the service worker
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);

        // Get FCM token
        getToken(messaging, {
          vapidKey:
            "BNBFBa19ubwQqHWFE179Cr2vT8aJf7CLMREknrpI94A86KdIPUF0VL9hv03noH-AwQWBl3BnKyVMvfmECI_Lb44",
          serviceWorkerRegistration: registration,
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("FCM Token:", currentToken);
            } else {
              console.log("No registration token available.");
            }
          })
          .catch((err) => {
            console.error("Error retrieving token:", err);
          });
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });

    // Listen for messages in the foreground
  }, []);

  // onMessage(messaging, (payload) => {
  //   console.log("Received Notify message: ", payload);
  //   if (payload.notification) {
  //     alert(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
  //   } else {
  //     console.warn("No notification object found in payload");
  //   }
  // });

  onMessage(messaging, (payload) => {
    const { title, body } = payload.notification;
    toast.info(`${title}: ${body}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light", // You can also use 'dark' theme
    });
  });

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default NotificationProvider;
