import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const quaterneryAppConfig = {
    apiKey: `${process.env.NEXT_PUBLIC_apiKey}`,
    authDomain: `${process.env.NEXT_PUBLIC_authDomain}`,
    projectId: `${process.env.NEXT_PUBLIC_projectId}`,
    storageBucket: `${process.env.NEXT_PUBLIC_storageBucket}`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_messagingSenderId}`,
    appId: `${process.env.NEXT_PUBLIC_appId}`
};

// Initialize Firebase
const quaterneryApp = initializeApp(quaterneryAppConfig, 'quaternery');

export const auth = getAuth(quaterneryApp);
export const app =  getDatabase(quaterneryApp);
