import firebase from "firebase/compat/app"
import database from "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyA8jE0Z93s83gbTHSAbAsIDqO18VLTNFmM",
  authDomain: "pokemon-game-7d576.firebaseapp.com",
  databaseURL: "https://pokemon-game-7d576-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-7d576",
  storageBucket: "pokemon-game-7d576.appspot.com",
  messagingSenderId: "534681325388",
  appId: "1:534681325388:web:2010a1bac6425159ac09e9"
};

firebase.initializeApp(firebaseConfig)

class Firebase {
  constructor() {
      this.fire = firebase
      this.database = this.fire.database()
  }

  getPokemonsSocket = (callback) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      callback(snapshot.val());
    })
  }

  offPokemonsSocket = () => {
    this.database.ref('pokemons').off()
  }

  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
  }

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon)
  }

  addPokemon = (pokeToSave) => {
    const newKey = this.database.ref().child("pokemons").push().key
    this.database.ref('pokemons/'+newKey).set(pokeToSave);
  }
}

const FirebaseClass = new Firebase();

export default FirebaseClass
