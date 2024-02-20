import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGHkmh9TbZqKP54zElSVGcuzxRNoZsfZo",
  authDomain: "flood-level-e24aa.firebaseapp.com",
  projectId: "flood-level-e24aa",
  storageBucket: "flood-level-e24aa.appspot.com",
  messagingSenderId: "327233330295",
  appId: "1:327233330295:web:67bb2ed388dcd63d22ba72"
};;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize reference to cloud fireStore

const db = getFirestore(app);

export default db;