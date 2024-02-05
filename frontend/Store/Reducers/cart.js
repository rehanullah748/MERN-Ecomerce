"use client"
import { createSlice } from '@reduxjs/toolkit'
import { redirect } from 'next/dist/server/api-utils'
let cartData = localStorage.getItem("cart")
console.log(cartData)
cartData = cartData && JSON.parse(cartData)
console.log(cartData)

const initialState = {
  cart: cartData && cartData.length > 0 ? cartData : [],
  totalAmount: 0,
  cartModel: false
}
console.log(initialState)

export const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, {payload}) => {
      console.log("cart", JSON.stringify(state.cart))

      console.log(payload)
      const checkProduct = state.cart.find((product) => product._id === payload._id && payload.userId === product.userId)
      if(!checkProduct) {
        state.cart = [...state.cart, payload]
        localStorage.setItem("cart", JSON.stringify(state.cart))
      }
    },
    removeProduct: (state, {payload}) => {
    console.log("cart",JSON.stringify(state.cart))
    console.log(payload)
      const filtered = state.cart.filter((item) => item._id !== payload.id && item.userId === payload.user._id)
      state.cart = filtered
      localStorage.setItem("cart", JSON.stringify(filtered))
      console.log(filtered)
console.log(payload)
    },
    increment: (state, {payload}) => {
      console.log(JSON.stringify(state.cart))
      console.log(payload)
     const product = state.cart.find((item) => item._id === payload.id && item.userId === payload.user._id)
     const index = state.cart.findIndex((item) => item._id === payload.id && item.userId === payload.user._id)
     console.log(index)
        if(product) {
          product.userQuantities += 1
          state.cart[index] = product
          localStorage.setItem("cart",JSON.stringify(state.cart))
        }
    },
    decrement: (state, {payload}) => {
      const product = state.cart.find((item) => item._id === payload.id && item.userId === payload.user._id)
     const index = state.cart.findIndex((item) => item._id === payload.id && item.userId === payload.user._id)
     console.log(index)
        if(product) {
          if(product.userQuantities > 1) {
            product.userQuantities -= 1
          state.cart[index] = product
          localStorage.setItem("cart",JSON.stringify(state.cart))
          }
          
        }
    },

    totalPrice: (state) => {
      let userQuantities = 0;
      let total = 0;  400
      state.cart.forEach((item) => {
        
        total=total + item.userQuantities * item.price;
                
      });
      
      state.totalAmount = total;
    },
    
  },
})

export const { addToCart, removeProduct, increment, decrement , totalPrice} = cartReducer.actions

export default cartReducer.reducer