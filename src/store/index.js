import { configureStore} from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons'
import cardsPl2Reducer from './player2Cards'
import userReducer from './user'

export default configureStore({
  reducer: {
    user: userReducer,
    pokemons: pokemonsReducer,
    cardsPl2: cardsPl2Reducer,
  }
})
