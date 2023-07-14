import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchEvents = createAsyncThunk("event/fetchEvents", async (cat) => {

    const {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/base/courses${cat ? `/?category=${cat}`: "/"}`})
    return data
})

const initialState = {
  events: {
    loading: false,
    events: [],
    msg: ""
  },
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
        state.events.loading = true;
        state.events.events = [];
        state.events.msg = "";
    })
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
        state.events.loading = false;
        state.events.events = action.payload;
        state.events.msg = "";
    })
    builder.addCase(fetchEvents.rejected, (state) => {
        state.events.loading = false;
        state.events.events = [];
        state.events.msg = "Error";
    })
    // 
    // --------------------------
    // 
    
  }
})

// Action creators are generated for each case reducer function
export const eventActions = eventSlice.actions

export default eventSlice.reducer