import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCourseList = createAsyncThunk("course/fetchCourseList", async (pl) => {

  

  const x = Object.entries(pl).map((q) => `${q[0]}=${q[1]}`).join("&");





    const {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/base/courses${pl ? `/?${x}`: "/"}`})
    return data
})

export const fetchCourse = createAsyncThunk("course/fetchCourse", async (pl) => {
    
    let {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/base/course/${pl.slug}/`})
    
    if (pl.access){
      let data2 = await axios({
        url: `${
          import.meta.env.VITE_API_URL
        }/api/user/checkcourseown/?course_slug=${pl.slug}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${pl.access}`,
        },
      })
      
      data = {...data, own_status: data2.data}
    }
    
    return data
})


export const fetchBoughtCourse = createAsyncThunk("course/fetchBoughtCourse", async (pl) => {

    
    const {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/base/takecourse/${pl.slug}/`,headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pl.access}`,
    },})

    
    return data
})

export const fetchChapter = createAsyncThunk("course/fetchChapter", async (pl) => {

    
    const {data} = await axios({method: 'GET', url: `${import.meta.env.VITE_API_URL}/api/base/takechapter/${pl.courseSlug}/?chapter_slug=${pl.chapterSlug}`,headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${pl.access}`,
    },})

    
    return data
})


const initialState = {
  courseList: {
    loading: false,
    courseList: {},
    msg: ""
  },
  course: {
    loading: false,
    course: {},
    msg: ""
  },
  boughtCourse: {
    loading: false,
    boughtCourse: {},
    msg: ""
  },
  boughtChapter: {
    loading: false,
    boughtChapter: {},
    msg: ""
  }
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourseList.pending, (state) => {
        state.courseList.loading = true;
        state.courseList.courseList = {}
        state.courseList.msg = "";
    })
    builder.addCase(fetchCourseList.fulfilled, (state, action) => {
        state.courseList.loading = false;
        state.courseList.courseList = action.payload;
        state.courseList.msg = "";
    })
    builder.addCase(fetchCourseList.rejected, (state) => {
        state.courseList.loading = false;
        state.courseList.courseList = {};
        state.courseList.msg = "Error";
    })
    // 
    // --------------------------
    // 
    builder.addCase(fetchCourse.pending, (state) => {
        state.course.loading = true;
        state.course.course = {};
        state.course.msg = "";
    })
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
        state.course.loading = false;
        state.course.course = action.payload;
        state.course.msg = "";
    })
    builder.addCase(fetchCourse.rejected, (state) => {
        state.course.loading = false;
        state.course.course = {};
        state.course.msg = "Error";
    })
    // 
    // ----------------------------
    // 
    builder.addCase(fetchBoughtCourse.pending, (state) => {
        state.boughtCourse.loading = true;
        state.boughtCourse.boughtCourse = {};
        state.boughtCourse.msg = "";
    })
    builder.addCase(fetchBoughtCourse.fulfilled, (state, action) => {
        state.boughtCourse.loading = false;
        state.boughtCourse.boughtCourse = action.payload;
        state.boughtCourse.msg = "";
    })
    builder.addCase(fetchBoughtCourse.rejected, (state) => {
        state.boughtCourse.loading = false;
        state.boughtCourse.boughtCourse = {};
        state.boughtCourse.msg = "Error";
    })
    // 
    // ------------------------------
    // 
    builder.addCase(fetchChapter.pending, (state) => {
        state.boughtChapter.loading = true;
        state.boughtChapter.boughtChapter = [];
        state.boughtChapter.msg = "";
    })
    builder.addCase(fetchChapter.fulfilled, (state, action) => {
        state.boughtChapter.loading = false;
        state.boughtChapter.boughtChapter = action.payload;
        state.boughtChapter.msg = "";
    })
    builder.addCase(fetchChapter.rejected, (state) => {
        state.boughtChapter.loading = false;
        state.boughtChapter.boughtChapter = [];
        state.boughtChapter.msg = "Error";
    })
  }
})

// Action creators are generated for each case reducer function
export const courseActions = courseSlice.actions

export default courseSlice.reducer