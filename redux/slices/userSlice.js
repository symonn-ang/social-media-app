import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "",
  username: "",
  email: "",
  uid: "",
  avatar: ""
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.name = action.payload.name
      state.username = action.payload.username
      state.email = action.payload.email
      state.uid = action.payload.uid
      state.avatar = action.payload.avatar
    }, // comma aight

    signOutUser: (state) => {
      state.name = ""
      state.username = ""
      state.email = ""
      state.uid = ""
      state.avatar = ""
    },

    updateAvatar: (state, action) => {
      state.avatar = action.payload // for new avatar
    }
  }
});

export const { signInUser, signOutUser, updateAvatar } = userSlice.actions

export default userSlice.reducer