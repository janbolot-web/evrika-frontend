import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import CoursesPage from "./pages/CoursesPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import VideoPage from "./pages/VideoPage";
import { selectIsAuth } from "./store/slices/auth";

const useRoutes = () => {
  const isAuth = useSelector(selectIsAuth);
  console.log(isAuth);
  if (isAuth === "ADMIN") {
    console.log(true);
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<DetailPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Navigate to="/adminPanel" replace />} />
      </Routes>
    );
  } else if (isAuth === "USER") {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<DetailPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/adminPanel" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<DetailPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminPanel" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default useRoutes;
