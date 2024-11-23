import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Components/ErrorPage";
import Contact from "../Pages/Contact/Contact";
import AllProducts from "../Pages/AllProducts/AllProducts/AllProducts";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Login from "../Pages/Auth/Login";
import AuthLayout from "../Layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../Pages/Auth/Signup";
import NonAdmin from "../Components/NonAdmin";

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
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <h1>cart</h1>
          </ProtectedRoute>
        ),
      },
    ],
  },
  // admin routes
  {
    path: "/admin/dashboard",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute>
        <h1>admin no component</h1>
      </ProtectedRoute>
    ),
  },
  {
    path: "/non-admin",
    element: <NonAdmin />,
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
    ],
  },
]);
