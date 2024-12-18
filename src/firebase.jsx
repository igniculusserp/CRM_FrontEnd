


import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkpS3e9GzNbl-Mag75fSjcYFwXh5vHY0g",
  authDomain: "message-dbf9c.firebaseapp.com",
  projectId: "message-dbf9c",
  storageBucket: "message-dbf9c.appspot.com",
  messagingSenderId: "472834376183",
  appId: "1:472834376183:web:f39a443f31f67ccf0faef2",
  measurementId: "G-NBP9WY1XF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app.name); 
const messaging = getMessaging(app);

// Request permission and generate FCM token
export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BNBFBa19ubwQqHWFE179Cr2vT8aJf7CLMREknrpI94A86KdIPUF0VL9hv03noH-AwQWBl3BnKyVMvfmECI_Lb44",
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("No registration token available.");
    }
  } catch (error) {
    console.error("Error fetching FCM token:", error);
  }
};

// Handle foreground messages
export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Notification received in foreground:", payload);
    toast.info(
      <div>
        <strong>{payload.notification?.title || "No Title"}</strong>
        <div>{payload.notification?.body || "No Body"}</div>
      </div>,
      // { position: toast.POSITION.TOP_RIGHT } 
    );
  });
};

export default app;
