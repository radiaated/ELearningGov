import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './../features/courseSlice'
import userReducer from './../features/userSlice'
import studyMaterialsReducer from './../features/studyMaterialsSlice'

export const store = configureStore({
  reducer: {course: courseReducer, user: userReducer, studyMaterials: studyMaterialsReducer},
})