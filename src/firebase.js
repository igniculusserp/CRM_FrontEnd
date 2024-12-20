import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAAgcqDswepf8wSncJox_w9wX2OX2Mejxw",
  authDomain: "learner-dc009.firebaseapp.com",
  databaseURL: "https://learner-dc009-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "learner-dc009",
  storageBucket: "learner-dc009.firebasestorage.app",
  messagingSenderId: "215967958133",
  appId: "1:215967958133:web:682c96e93b497f5950a43c"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);

          return getToken(messaging, {
            vapidKey: "BAi2HSyzQtf9lcuB0BYWrtIwbv1T-DpYFOu11VGPFMP3mXDR9GVVyKqZTTduFqeGpQsb7-3z-BbqbJUDg_AujLc	",
            serviceWorkerRegistration: registration,
          });
        })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
          } else {
            console.log("Failed to generate the app registration token");
          }
        })
        .catch((err) => {
          console.log("An error occurred when requesting to receive the token:", err);
        });
    } else {
      console.log("User Permission Denied");
    }
  });
};

// Listen for messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
