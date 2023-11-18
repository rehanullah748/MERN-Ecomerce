import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './Reducers/cart'
export const store = configureStore({
  reducer: {
    cartReducer
  },
})
