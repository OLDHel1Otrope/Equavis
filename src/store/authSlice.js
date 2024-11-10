import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  workspace: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.workspace = action.payload.workspace;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.workspace = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
