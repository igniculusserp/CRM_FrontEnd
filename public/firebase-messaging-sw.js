// firebase-messaging-sw.js

// Import Firebase messaging service worker
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyBlH633lAfyzkJzUFAmqLnLbbfeJbHv0Qo",
  authDomain: "igniculusscrm.firebaseapp.com",
  projectId: "igniculusscrm",
  storageBucket: "igniculusscrm.appspot.com",
  messagingSenderId: "802156774823",
  appId: "1:802156774823:web:da4a57e595e9f92c9ee282",
  measurementId: "G-M3GGKHKBK7"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification.title || "New Message";
  const notificationOptions = {
    body: payload.notification.body || "You have received a new message.",
    icon: '/firebase-logo.png' // Ensure this path is correct
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
