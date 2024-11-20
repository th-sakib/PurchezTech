import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  registrationEmail: "", // the temporary email after registration
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setRegistrationEmail: (state, action) => {
      state.registrationEmail = action.payload;
    },
    clearRegistrationEmail: (state) => {
      state.registrationEmail = "";
    },
    clearUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const {
  setUser,
  clearUser,
  setRegistrationEmail,
  clearRegistrationEmail,
} = userSlice.actions;

export const selectRegistrationEmail = (state) => state.user.registrationEmail; // the state here is the entire redux state // so we get the user as it is part of the redux state and inside it we get our registration email
export const selectIsAuthenticated = (state) => !!state.user?.userInfo; // !!(double negation make the value boolean)
export const selectUserRole = (state) => state.user?.userInfo?.role;

export default userSlice.reducer;
