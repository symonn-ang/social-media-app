import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "./slices/modalSlice"
import userSlice from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice
  },
})