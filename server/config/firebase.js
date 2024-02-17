import dotenv from 'dotenv';

dotenv.config();


export const firebaseConfig= {
        apiKey: process.env.FIREBASE_PROJECT_APIKEY,
        authDomain:process.env.FIREBASE_PROJECT_AUTH,
        projectId:process.env.FIREBASE_PROJECT_ID,
        storageBucket:process.env.FIREBASE_PROJECT_STORAGEBUCKET,
        messagingSenderId:process.env.FIREBASE_PROJECT_SENDERID,
        appId:process.env.FIREBASE_PROJECT_APPID,
        measurementId:process.env.FIREBASE_PROJECT_MEASUREMENT,
    }