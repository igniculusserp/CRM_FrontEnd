import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBlH633lAfyzkJzUFAmqLnLbbfeJbHv0Qo",
  authDomain: "igniculusscrm.firebaseapp.com",
  projectId: "igniculusscrm",
  storageBucket: "igniculusscrm.appspot.com",
  messagingSenderId: "802156774823",
  appId: "1:802156774823:web:da4a57e595e9f92c9ee282",
  measurementId: "G-M3GGKHKBK7"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);

            return getToken(messaging, {
              vapidKey: "BOhAmHCIF385Ys47ISMWZty-Yqhy_ZOskHTrXkjaO1xIOIr0AV9iRSr8DOx7liiHlJrCiPI1FPzPxaqvE7J42_A",
              serviceWorkerRegistration: registration,
            });
          })
          .then((currentToken) => {
            if (currentToken) {
              console.log("Client Token: ", currentToken);
              // Send the token to your server here
            } else {
              console.log("Failed to generate the app registration token");
            }
          })
          .catch((err) => {
            console.error("An error occurred while retrieving token:", err);
          });
      } else {
        console.error("Service Worker is not supported in this browser.");
      }
    } else {
      console.log("User Permission Denied");
    }
  }).catch((error) => {
    console.error("Error requesting notification permission:", error);
  });
};

// Listen for messages
export const onMessageListener = () => 
  new Promise((resolve, reject) => {
    try {
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload); // Log the received message
        resolve(payload);
      });
    } catch (error) {
      console.error("Error in onMessageListener:", error);
      reject(error);
    }
  });
