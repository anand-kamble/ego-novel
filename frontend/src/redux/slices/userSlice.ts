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
  reducers: {
    login: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loggedIn = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.password = action.payload.password;
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
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

// Action creators are generated for each case reducer function
export const { login, logout } = UserSlice.actions;

export default UserSlice.reducer;
