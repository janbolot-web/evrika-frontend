import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../axios";

export const fetchAllCourses = createAsyncThunk(
  "course/fetchAllCourses",
  async function () {
    try {
      const data = await axios
        .get("/getAllCourses")
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCourse = createAsyncThunk(
  "course/fetchCourse",
  async function (id) {
    try {
      const data = await axios
        .get("/getCourse/" + id)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchLessons = createAsyncThunk(
  "course/fetchLessons",
  async function (id) {
    try {
      const data = await axios
        .get("/getLessons/" + id)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchLesson = createAsyncThunk(
  "course/fetchLesson",
  async function (id) {
    try {
      const data = await axios
        .get("/getLesson/" + id)
        .then((res) => res.data)
        .then((data) => data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createCourse = createAsyncThunk(
  "courese/createCourse",
  async function (params) {
    try {
      await axios
        .post("/createCourse", params)
        .then((res) => res.data)
        .then((data) => toast.success(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courese/deleteCourse",
  async function (id) {
    try {
      await axios
        .delete(`/deleteCourse/${id}`)
        .then((res) => res.data)
        .then((data) => toast.success(data.message));
      return id;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: null,
    courseDetail: null,
    lessons: null,
    lesson: null,
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAllCourses.pending]: (state, action) => {
      state.status = "loading";
      state.courses = null;
    },
    [fetchAllCourses.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.courses = action.payload;
    },
    [fetchAllCourses.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchCourse.pending]: (state, action) => {
      state.status = "loading";
      state.courseDetail = null;
    },
    [fetchCourse.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.courseDetail = action.payload;
    },
    [fetchCourse.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchLessons.pending]: (state, action) => {
      state.status = "loading";
      state.lessons = null;
    },
    [fetchLessons.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.lessons = action.payload;
    },
    [fetchLessons.rejected]: (state, action) => {
      state.status = "error";
    },
    [fetchLesson.pending]: (state, action) => {
      state.status = "loading";
      state.lesson = null;
    },
    [fetchLesson.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.lesson = action.payload;
    },
    [fetchLesson.rejected]: (state, action) => {
      state.status = "error";
    },
    [createCourse.pending]: (state, action) => {
      state.status = "loading";
    },
    [createCourse.fulfilled]: (state, action) => {
      state.status = "loaded";
    },
    [createCourse.rejected]: (state, action) => {
      state.status = "error";
    },
    [deleteCourse.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteCourse.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
      // courses.filter((course) => course.id !== action.payload);
    },
    [deleteCourse.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const courseReducer = courseSlice.reducer;
