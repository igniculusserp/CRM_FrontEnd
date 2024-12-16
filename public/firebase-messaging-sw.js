/* eslint-disable no-undef */

// Import Firebase messaging service worker
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the messagingSenderId
const firebaseConfig = {
  apiKey: "AIzaSyBlH633lAfyzkJzUFAmqLnLbbfeJbHv0Qo",
  authDomain: "igniculusscrm.firebaseapp.com",
  projectId: "igniculusscrm",
  storageBucket: "igniculusscrm.appspot.com",
  messagingSenderId: "802156774823",
  appId: "1:802156774823:web:da4a57e595e9f92c9ee282",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
