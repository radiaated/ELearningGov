import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



const initialState = {
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        
        state.cart.unshift(action.payload)
        localStorage.setItem("cart", JSON.stringify( state.cart)) 
    },
    removeCart: (state, action) => {
        
        state.cart.splice(action.payload,1)
        localStorage.setItem("cart", JSON.stringify( state.cart)) 
        
    },
    clearCart: (state) => {
        
        state.cart = []
        localStorage.removeItem("cart")
        
        
    }
  },
  
})

// Action creators are generated for each case reducer function
export const appActions = appSlice.actions

export default appSlice.reducer