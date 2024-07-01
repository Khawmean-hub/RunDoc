// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyCxIeFcElULOxMbMrkmGsjfdgY2Q-cSxcE",
    authDomain: "run-doc.firebaseapp.com",
    projectId: "run-doc",
    storageBucket: "run-doc.appspot.com",
    messagingSenderId: "277377997166",
    appId: "1:277377997166:web:36f6b8723343832ff7897f"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

