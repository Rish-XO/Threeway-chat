import { createSlice } from "@reduxjs/toolkit";

// const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    role: null,
    isVerified: true,
    user_id: null,
  },
  reducers: {
    loginHandler(state, action) {
      const data = action.payload;
      console.log(data);
      state.isLoggedIn = true;
      state.role = data.role;
      state.user_id = data.id;
      state.isVerified = true;
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role)
      localStorage.setItem("isLoggedIn", true)
      localStorage.setItem('userID' , data.id)
    },
    verifyHandler(state, action) {
      const data = action.payload;
      state.isVerified = data.status;
      state.role = data.role
      state.user_id = data.id;
      state.isLoggedIn = true;
      localStorage.setItem("role", data.role)
    },

    logoutHandler(state) {
      console.log("logging out");
      state.isLoggedIn = false;
      state.role = null;
      state.isVerified = false;
      state.user_id = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userID");
    },
  },
});

export const { loginHandler, logoutHandler, verifyHandler } = authSlice.actions;
export default authSlice.reducer;
