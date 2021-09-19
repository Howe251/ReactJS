import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8jE0Z93s83gbTHSAbAsIDqO18VLTNFmM",
  authDomain: "pokemon-game-7d576.firebaseapp.com",
  databaseURL: "https://pokemon-game-7d576-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-7d576",
  storageBucket: "pokemon-game-7d576.appspot.com",
  messagingSenderId: "534681325388",
  appId: "1:534681325388:web:2010a1bac6425159ac09e9"
};

const firebase = initializeApp(firebaseConfig);

const database = getDatabase();
export default database
