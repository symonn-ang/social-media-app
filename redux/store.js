import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./slices/modalSlice"
import userSlice from "./slices/userSlice"
import loadingSlice from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    loading: loadingSlice
  },
})