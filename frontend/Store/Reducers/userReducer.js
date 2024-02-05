import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, 
  model: false,
  cartModel: false
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
  
    openModel: (state) => {
      state.model = true;
    },
     closeModel: (state) => {
      state.model = false;
     },
     toggleModel:(state) => {
      state.cartModel = !state.cartModel;
     },
     setUser:(state,{payload}) => {
      state.user = payload
     }
  },
})

export const { openModel, closeModel, toggleModel, setUser } = userReducer.actions

export default userReducer.reducer