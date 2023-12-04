import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [], 
  admin: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, {payload}) => {
     state.user = [...state.user, payload]
     
      
    },
    
  },
})

export const { addUser } = userSlice.actions

export default userSlice.reducer