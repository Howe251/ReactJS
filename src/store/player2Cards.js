import {createSlice} from '@reduxjs/toolkit'
import FirebaseClass from '../service/firebase'

export const slice = createSlice({
  name: 'cardsPl2',
  initialState: {
    data: [],
  },
  reducers: {
    addPL2Pokemons: (state, action) => ({
      ...state,
      data: action.payload
    }),
    removePL2Pokemons: (state) => ({
      ...state,
      data: {}
    }),
    postPokemon: (state, action) => {
      const data = action.payload
      FirebaseClass.addPokemon(data);
    }
  }
})

export const {addPL2Pokemons, removePL2Pokemons, setSelect1Poke, postPokemon} = slice.actions;

export const selectPl2Data = state => state.cardsPl2.data;

export default slice.reducer
