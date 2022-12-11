import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import "./App.scss";
import Header from "./components/Header";
import { fetchAuthMe, selectIsAuth } from "./store/slices/auth";
import "react-toastify/dist/ReactToastify.css";
import useRoutes from "./routes";
import Loader from "./components/Loader";

function App() {
  const routes = useRoutes();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const status = useSelector(state => state.courses.status)
  const statusAuth = useSelector(state => state.auth.status)

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <Header />
      {routes}
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<DetailPage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes> */}
      {status === 'loading' && <Loader />}
      {statusAuth === 'loading' && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
