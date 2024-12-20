// firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAkpS3e9GzNbl-Mag75fSjcYFwXh5vHY0g",
  authDomain: "message-dbf9c.firebaseapp.com",
  projectId: "message-dbf9c",
  storageBucket: "message-dbf9c.firebasestorage.app",
  messagingSenderId: "472834376183",
  appId: "1:472834376183:web:f39a443f31f67ccf0faef2",
  measurementId: "G-NBP9WY1XF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log("Got Fire message",payload);
  alert(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
});

export { messaging };



