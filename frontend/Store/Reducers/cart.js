import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [], 
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, {payload}) => {
     
      console.log(payload)
    },
    
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer