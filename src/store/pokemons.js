import {createSlice} from '@reduxjs/toolkit'
import FirebaseClass from '../service/firebase'

export const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    turn: null,
    error: null,
    selectedPokemons: {},
    win: false
  },
  reducers: {
    fetchPokemons: state => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),
    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),
    setTurn: (state, action) => ({
      ...state,
      turn: action.payload,
    }),
    setSelectedPokemons: (state, {payload: {key, pokemon}}) => {
      const newPoke = {...state.selectedPokemons};
      if (newPoke[key]) {
        delete newPoke[key]
        return {...state, selectedPokemons: newPoke}
      }

      if (Object.entries(state.selectedPokemons).length < 5) {
        newPoke[key] = pokemon
        return {...state, selectedPokemons: newPoke}
      }
    },
    clearSelectedPokemons: (state) => ({
      ...state,
      selectedPokemons: {}
    }),
    setWin: (state, action) => ({
      ...state,
      win: action.payload,
    }),
  }
})

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject, setTurn, setSelectedPokemons, setWin, clearSelectedPokemons} = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;
export const selectedPokemons = state => state.pokemons.selectedPokemons;
export const getWin = state => state.pokemons.win;
export const getTurn = state => state.pokemons.turn;

export const getPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemons())
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonsResolve(data))
}

export default slice.reducer
