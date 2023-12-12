import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [], 
  admin: {},
  model: false
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
     }
  },
})

export const { openModel, closeModel } = userReducer.actions

export default userReducer.reducer