import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerData: null,
  loading: false,
  token: localStorage.getItem("TOKEN")
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setRegisterData(state, value) {
      state.registerData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  }
})

export const { setRegisterData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
