import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAzWM49eihPfnQQy2S1j9pkomuEvAEJsj0",
    authDomain: "ollie-mobile.firebaseapp.com",
    projectId: "ollie-mobile",
    storageBucket: "ollie-mobile.appspot.com",
    messagingSenderId: "967045713061",
    appId: "1:967045713061:web:82670cb97dac44e9ebd14c",
    // measurementId: "G-583J7Y52XB"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();
const storageRef = firebase.storage();
export { firebase, db, storageRef };