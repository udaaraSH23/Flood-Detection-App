import firebase from '@react-native-firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyDGHkmh9TbZqKP54zElSVGcuzxRNoZsfZo",
  authDomain: "flood-level-e24aa.firebaseapp.com",
  databaseURL: "https://flood-level-e24aa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flood-level-e24aa",
  storageBucket: "flood-level-e24aa.appspot.com",
  messagingSenderId: "327233330295",
  appId: "1:327233330295:web:67bb2ed388dcd63d22ba72"
};

// Initialize Firebase ====================================================================================
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}