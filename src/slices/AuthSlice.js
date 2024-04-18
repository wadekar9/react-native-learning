import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  details: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    doAuthenticate:(state,action) => {
      state.isAuthenticated = true;
      state.details = action.payload;
    },
    clearDetails:(state)=>{
      state.details = null;
      state.isAuthenticated = false;
    }
  },
})

export const { doAuthenticate, clearDetails } = authSlice.actions;

export default authSlice.reducer