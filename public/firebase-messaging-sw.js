/* eslint-disable no-undef */

// Import Firebase messaging service worker
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the messagingSenderId
const firebaseConfig = {
  apiKey: "AIzaSyAAgcqDswepf8wSncJox_w9wX2OX2Mejxw",
  authDomain: "learner-dc009.firebaseapp.com",
  databaseURL: "https://learner-dc009-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "learner-dc009",
  storageBucket: "learner-dc009.firebasestorage.app",
  messagingSenderId: "215967958133",
  appId: "1:215967958133:web:682c96e93b497f5950a43c"
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
