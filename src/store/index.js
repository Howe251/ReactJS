import { configureStore} from '@reduxjs/toolkit';
import counterReducer from './counter'
import pokemonsReducer from './pokemons'
import cardsPl2Reducer from './player2Cards'

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    cardsPl2: cardsPl2Reducer,
    counter: counterReducer
  }
})
