import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProfile = createAsyncThunk("user/fetchProfile", async (access) => {
 
    const {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/user/profile/`,headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    
    }})

    
    return data
})

export const fetchUserCourses = createAsyncThunk("user/fetchUserCourses", async (access) => {
 
    const {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/user/profilecourses/`,headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    
    }})

    
    return data
})


const initialState = {
  profile: {
    loading: false,
    profile: {},
    msg: ""
  },
  userCourses: {
    loading: false,
    userCourses: {},
    msg: ""
  },
  
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
        state.profile.loading = true;
        state.profile.profile = {};
        state.profile.msg = "";
    })
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile.loading = false;
        state.profile.profile = action.payload;
        state.profile.msg = "";
    })
    builder.addCase(fetchProfile.rejected, (state) => {
        state.profile.loading = false;
        state.profile.profile = {};
        state.profile.msg = "Error";
    })
    // 
    // --------------------------
    // 
    builder.addCase(fetchUserCourses.pending, (state) => {
        state.userCourses.loading = true;
        state.userCourses.userCourses = {};
        state.userCourses.msg = "";
    })
    builder.addCase(fetchUserCourses.fulfilled, (state, action) => {
        state.userCourses.loading = false;
        state.userCourses.userCourses = action.payload;
        state.userCourses.msg = "";
    })
    builder.addCase(fetchUserCourses.rejected, (state) => {
        state.userCourses.loading = false;
        state.userCourses.userCourses = {};
        state.userCourses.msg = "Error";
    })
    // 
    // --------------------------
    // 
   
  }
})

// Action creators are generated for each case reducer function
export const userActions =userSlice.actions

export default userSlice.reducer