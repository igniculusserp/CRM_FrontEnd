importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js");

// Initialize Firebase in the Service Worker
const firebaseConfig = {
  apiKey: "AIzaSyAkpS3e9GzNbl-Mag75fSjcYFwXh5vHY0g",
  authDomain: "message-dbf9c.firebaseapp.com",
  projectId: "message-dbf9c",
  storageBucket: "message-dbf9c.firebasestorage.app",
  messagingSenderId: "472834376183",
  appId: "1:472834376183:web:f39a443f31f67ccf0faef2",
  measurementId: "G-NBP9WY1XF3",
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title || "No Title";
  const notificationOptions = {
    body: payload.notification.body || "No Body",
    icon: "/path-to-your-icon.png", // Optional
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
