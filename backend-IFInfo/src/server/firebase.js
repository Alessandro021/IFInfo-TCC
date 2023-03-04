import firebase from "firebase/app/dist/index.cjs.js"
import 'firebase/database/dist/index.cjs.js';
import 'firebase/firestore/dist/index.node.cjs.js'
// import 'firebase/storage/dist/index.node.cjs.js'
import "firebase/storage/dist/index.cjs.js"
import dotenv  from "dotenv"
dotenv.config()

const firebaseConfig = {

  // CONFIG DO FIRABASE PROJETO NOTICIAS IF (esse é o principal)
    apiKey: process.env.API_KEY ,
    authDomain: process.env.AUTH_DOMAIN ,
    projectId: process.env.PROJECT_ID ,
    storageBucket: process.env.STORAGE_BUCKET ,
    messageSenderId: process.env.MESSAGING_SENDER_ID ,
    appId: process.env.APP_ID
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

}
export default firebase;