import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async function (user, { dispatch }) {
    try {
      const data = await axios
        .post(`/auth/login`, user)
        .then((res) => res.data)
        .then((data) => data);
      toast.success(data.message);
      return data.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async function (user) {
    try {
      const data = await axios
        .post(`/auth/register`, user)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);
export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async function () {
    const data = await axios
      .get(`/auth/me`)
      .then((res) => res.data)
      .then((data) => data);
    return data;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: "",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: action.payload.id,
          token: action.payload.token,
          // role: action.payload.role,
        })
      );
      // state.isAuth = true;
      state.user = action.payload;
      state.status = "resolved";
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => state.auth.data?.roles[0];
export const { setUser, logout, setError } = authSlice.actions;

export const authReducer = authSlice.reducer;
