import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    changeAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
});

export const {setUser, setToken, changeAvatar} = authSlice.actions;
export default authSlice.reducer;
