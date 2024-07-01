// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCxIeFcElULOxMbMrkmGsjfdgY2Q-cSxcE",
    authDomain: "run-doc.firebaseapp.com",
    projectId: "run-doc",
    storageBucket: "run-doc.appspot.com",
    messagingSenderId: "277377997166",
    appId: "1:277377997166:web:36f6b8723343832ff7897f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// messaging
let messaging:any;
if (typeof window !== "undefined") {
    if ('serviceWorker' in navigator) {
        messaging = getMessaging(app);
    } else {
        console.warn('Service workers are not supported in this browser.');
    }
}
// messaging

export { auth, messaging };
