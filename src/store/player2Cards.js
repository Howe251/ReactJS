import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'cardsPl2',
  initialState: {
    data: {},
  },
  reducers: {
    addPL2Pokemons: (state, action) => ({
      ...state,
      data: action.payload
    }),
    removePL2Pokemons: (state) => ({
      ...state,
      data: {}
    })
  }
})

export const {addPL2Pokemons, removePL2Pokemons} = slice.actions;

export const selectPl2Data = state => state.cardsPl2.data;

export default slice.reducer
