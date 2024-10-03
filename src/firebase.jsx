// firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBlH633lAfyzkJzUFAmqLnLbbfeJbHv0Qo",
  authDomain: "igniculusscrm.firebaseapp.com",
  projectId: "igniculusscrm",
  storageBucket: "igniculusscrm.appspot.com",
  messagingSenderId: "802156774823",
  appId: "1:802156774823:web:da4a57e595e9f92c9ee282"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "6GkCSdjx1wI2Ko_h3g8rTDwIgIXX-gxVPofrmWUXosE" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Token generated successfully:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token.', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
