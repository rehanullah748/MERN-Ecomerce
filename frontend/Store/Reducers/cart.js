import { createSlice } from '@reduxjs/toolkit'
let cartData = localStorage.getItem("cart")
cartData = JSON.parse(cartData)
console.log(cartData)
const initialState = {
  cart: cartData && cartData.length > 0 ? cartData : [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, {payload}) => {
      const checkProduct = state.cart.find((product) => product._id === payload._id)
      if(!checkProduct) {
        state.cart = [...state.cart, payload]
        localStorage.setItem("cart", JSON.stringify(state.cart))
      }
    
      
    },
    
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer