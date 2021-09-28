import {createSlice} from '@reduxjs/toolkit'
import FirebaseClass from '../service/firebase'

export const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    turn: {},
    error: null,
    selectedPokemons: {},
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
    plTurn: (state, action) => ({
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
    }
  }
})

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject, plTurn, setSelectedPokemons} = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;
export const selectedPokemons = state => state.pokemons.selectedPokemons;

export const getPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemons())
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonsResolve(data))
}

export default slice.reducer
