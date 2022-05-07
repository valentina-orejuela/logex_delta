// import firebase from "firebase";
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';



const base = (() => {
  var config = {
    apiKey: "AIzaSyBTiWp1jjk6cLm0PuU2VIV-xZz9d4TPJaE",
    authDomain: "logex-app.firebaseapp.com",
    databaseURL: "https://logex-app.firebaseio.com",
    projectId: "logex-app",
    storageBucket: "logex-app.appspot.com",
    messagingSenderId: "779751174453",
    appId: "1:779751174453:web:fd1e827f7e94b599299c7c",
    measurementId: "G-576C9N0WXP",
  };

  firebase.initializeApp(config);

  return firebase;
})();

const auth = base.auth();
const db = base.firestore();
const fieldValue = firebase.firestore.FieldValue;
export { auth, db,  fieldValue };

export default base.auth;
