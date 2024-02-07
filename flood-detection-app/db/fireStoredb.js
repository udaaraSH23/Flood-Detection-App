import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxNW7QSsQ2QTXsMkPnql3ZQf9LXpvqIlM",
  authDomain: "waterlevel-afb.firebaseapp.com",
  projectId: "waterlevel-afb",
  storageBucket: "waterlevel-afb.appspot.com",
  messagingSenderId: "441576475103",
  appId: "1:441576475103:web:1e04f13dc35b0dc1359c6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize reference to cloud fireStore

const db = getFirestore(app);

export default db;