import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './../features/courseSlice'
import userReducer from './../features/userSlice'
import studyMaterialsReducer from './../features/studyMaterialsSlice'
import appReducer from './../features/appSlice'

export const store = configureStore({
  reducer: {course: courseReducer, user: userReducer, studyMaterials: studyMaterialsReducer, app: appReducer},
})