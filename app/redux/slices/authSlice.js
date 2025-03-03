import { login } from "@/app/api/auth/route";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await login(email, password);
      if (response.data) {
        dispatch(loginSuccess(response.data));
        return response.data;
      }
      return rejectWithValue("Invalid response from server");
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
