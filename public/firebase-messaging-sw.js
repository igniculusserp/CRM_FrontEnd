/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js");

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

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
