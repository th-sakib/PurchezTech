import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Components/ErrorPage";
import Contact from "../Pages/Contact/Contact";
import AllProducts from "../Pages/AllProducts/AllProducts/AllProducts";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Login from "../Pages/Auth/Login";
import AuthLayout from "../Layouts/AuthLayout";
import ProtectedRoute from "./protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <h1>admin no component</h1>,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <h1>register no component</h1>,
      },
    ],
  },
]);
