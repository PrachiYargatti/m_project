import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import RegisterCourse from "./pages/RegisterCourse";
import CourseDetails from "./pages/CourseDetails";

import AllCourses from "./pages/course/AllCourses";
import AddCourse from "./pages/course/AddCourse";
import UpdateCourse from "./pages/course/UpdateCourse";

import AllVideos from "./pages/video/AllVideos";
import AddVideo from "./pages/video/AddVideo";
import UpdateVideo from "./pages/video/UpdateVideo";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute"

import AllStudents from "./pages/student/AllStudents";
import MyCourses from "./pages/student/MyCourses"
import ChangePassword from "./pages/student/ChangePassword";
import UpdateProfile from "./pages/student/UpdateProfile";

export const LoginContext = createContext(); //share data across multiple components or child

function App() {
  const [loginStatus, setLoginStatus] = useState(  //Stores data inside a component, Triggers a re-render when the data changes
    !!sessionStorage.getItem("token")
  );

  return (
    <>
      <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterCourse />} />
          <Route path="/about" element={<About />} />
          <Route path="/course-details" element={<CourseDetails />} />

          {/* Student */}
          <Route
            path="/course/all-courses"
            element={
              <ProtectedRoute>
                <AllCourses />
              </ProtectedRoute>
            }
          />

          {/* Admin – Courses */}
          <Route
            path="/admin/add-course"
            element={
              <AdminRoute>
                <AddCourse />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/update-course"
            element={
              <AdminRoute>
                <UpdateCourse />
              </AdminRoute>
            }
          />

          {/* Admin – Videos */}
          <Route
            path="/admin/videos"
            element={
              <AdminRoute>
                <AllVideos />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-video"
            element={
              <AdminRoute>
                <AddVideo />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/update-video"
            element={
              <AdminRoute>
                <UpdateVideo />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/students"
            element={
              <AdminRoute>
                <AllStudents />
              </AdminRoute>
            }
          />

          <Route 
            path="/my-courses" 
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            } />

          <Route 
            path="/profile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

        </Routes>
      </LoginContext.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
