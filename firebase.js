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

{
    /**
     * <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(80,80,80)" class="bi bi-person-vcard" viewBox="0 0 16 16">
                                    <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12z"/>
                                </svg>
                                <h1 className='font-mono'>{dni}</h1>
                            </div>
                            <h1 className='font-mono mt-2'>{ar}</h1>
                        </div>
     */
}