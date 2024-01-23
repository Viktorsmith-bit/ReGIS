import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const quaterneryAppConfig = {
    apiKey: "AIzaSyAOMtqqRv3mkGPnAGwkbVTAMqAugBYtRyY",
    authDomain: "walsh-a.firebaseapp.com",
    projectId: "walsh-a",
    storageBucket: "walsh-a.appspot.com",
    messagingSenderId: "272356071483",
    appId: "1:272356071483:web:35e1f1f421144506f1a41e"
};

// Initialize Firebase
const quaterneryApp = initializeApp(quaterneryAppConfig, 'quaternery');

export const auth = getAuth(quaterneryApp);
export const app =  getDatabase(quaterneryApp);
