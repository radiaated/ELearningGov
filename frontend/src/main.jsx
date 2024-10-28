import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./layout/Layout";
import AdminLayout from "./layout/AdminLayout";
import CoursesPage from "./pages/allcourses/CoursesPage";
import CoursePage from "./pages/allcourses/CoursePage";
import BuyCourse from "./pages/allcourses/BuyCourse";
import VerifyPayment from "./pages/allcourses/VerifyPayment";
import TakeCoursePage from "./pages/takecourse/TakeCoursePage";
import TakeChapter from "./pages/takecourse/TakeChapter";
import StudyMaterialsPage from "./pages/studymaterials/StudyMaterialsPage";
import StudyMaterialPage from "./pages/studymaterials/StudyMaterialPage";
import UserCourses from "./pages/profile/UserCourses";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import CartPage from "./pages/cart/CartPage";
import Profile from "./pages/profile/Profile";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import { Provider } from "react-redux";
import { UserContextProvider } from "./context/UserContext";
import { store } from "./app/store";
import "./index.css";
import { Outlet } from "react-router-dom";
import CourseList from "./pages/admin/CourseList";

import AdminLogin from "./pages/admin/AdminLogin";
import CreateCourse from "./pages/admin/CreateCourse";
import UpdateCourse from "./pages/admin/UpdateCourse";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextProvider>
        <Layout />
      </UserContextProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "courses",
        element: <CoursesPage />,
      },
      {
        path: "course/:courseSlug",
        element: <CoursePage />,
      },
      {
        path: "buycourse",
        element: (
          <PrivateRoute>
            <BuyCourse />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "verifypay",
        element: (
          <PrivateRoute>
            <VerifyPayment />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "takecourse/:courseSlug",
        element: (
          <PrivateRoute>
            <TakeCoursePage />
          </PrivateRoute>
        ),
      },
      {
        path: "takecourse/:courseSlug/:chapterSlug",
        element: (
          <PrivateRoute>
            <TakeChapter />
          </PrivateRoute>
        ),
      },
      {
        path: "studymaterials",
        element: <StudyMaterialsPage />,
      },
      {
        path: "studymaterial/:smSlug",
        element: <StudyMaterialPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "yourcourses",
        element: (
          <PrivateRoute>
            <UserCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <UserContextProvider>
        <AdminLayout />
      </UserContextProvider>
    ),
    children: [
      { index: true, element: <AdminLogin /> },
      { path: "create-course", element: <CreateCourse /> },
      { path: "courses", element: <CourseList /> },
      { path: "update-course/:slug", element: <UpdateCourse /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
