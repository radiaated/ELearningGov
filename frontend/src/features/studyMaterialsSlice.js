import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchStudyMaterials = createAsyncThunk("studyMaterials/fetchStudyMaterials", async (pl) => {

  const x = Object.entries(pl).map((q) => `${q[0]}=${q[1]}`).join("&");


    const {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/base/studymaterials${pl ? `/?${x}`: "/"}`,headers: {
      "Content-Type": "application/json",  
    }})

  
    return data
})
export const fetchStudyMaterial = createAsyncThunk("studyMaterials/fetchStudyMaterial", async (slug) => {

    const {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/base/studymaterial/${slug}`,headers: {
      "Content-Type": "application/json",  
    }})

  
    return data
})


const initialState = {
  studyMaterials: {
    loading: false,
    studyMaterials: [],
    msg: ""
  },
  studyMaterial: {
    loading: false,
    studyMaterial: {},
    msg: ""
  },
  
}

export const studyMaterialsSlice = createSlice({
  name: 'studyMaterials',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudyMaterials.pending, (state) => {
        state.studyMaterials.loading = true;
        state.studyMaterials.studyMaterials = [];
        state.studyMaterials.msg = "";
    })
    builder.addCase(fetchStudyMaterials.fulfilled, (state, action) => {
        state.studyMaterials.loading = false;
        state.studyMaterials.studyMaterials = action.payload;
        state.studyMaterials.msg = "";
    })
    builder.addCase(fetchStudyMaterials.rejected, (state) => {
        state.studyMaterials.loading = false;
        state.studyMaterials.studyMaterials = [];
        state.studyMaterials.msg = "Error";
    })
    // 
    // --------------------------
    // 
    builder.addCase(fetchStudyMaterial.pending, (state) => {
      state.studyMaterial.loading = true;
      state.studyMaterial.studyMaterial = {};
      state.studyMaterial.msg = "";
    })
    builder.addCase(fetchStudyMaterial.fulfilled, (state, action) => {
        state.studyMaterial.loading = false;
        state.studyMaterial.studyMaterial = action.payload;
        state.studyMaterial.msg = "";
    })
    builder.addCase(fetchStudyMaterial.rejected, (state) => {
        state.studyMaterial.loading = false;
        state.studyMaterial.studyMaterial = {};
        state.studyMaterial.msg = "Error";
    })
  }
})

// Action creators are generated for each case reducer function
export const studyMaterialsActions =studyMaterialsSlice.actions

export default studyMaterialsSlice.reducer