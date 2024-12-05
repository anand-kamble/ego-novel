import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { stat } from "fs";

export interface UserState {
  loggedIn: boolean;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loggedIn: false,
  email: null,
  username: null,
  firstName: null,
  lastName: null,
  password: null,
  error: null,
  loading: false,
};

export const UserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loggedIn = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loggedIn = true;
        const user = action.payload.data[0]
        state.email = user.email;
        state.username = user.username;
        state.firstName = user.firstName;
        state.lastName = user.lastName;
        state.password = user.password;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loggedIn = false;
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signInUser.pending, (state) => {
        state.loggedIn = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loggedIn = true;
        console.log("action.payload", action.payload);
        state.email = action.payload.user.email;
        state.username = action.payload.user.username;
        state.firstName = action.payload.user.firstName;
        state.lastName = action.payload.user.lastName;
        state.password = action.payload.user.password;
        state.loading = false;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loggedIn = false;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    user: {
      email: string;
      username: string;
      firstname: string;
      lastname: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const dataToPost = {
        created_at: new Date().toISOString(),
        ...user,
      };
      const response = await axios.post(BACKEND_URL + "/register", dataToPost);
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (
    user: {
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(BACKEND_URL + "/login", user);
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default UserSlice.reducer;
