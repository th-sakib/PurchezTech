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
import NoAccess from "../Components/NonAdmin";
import AdminLayout from "../Layouts/AdminLayout";
import Profile from "../Pages/Shared/Profile/Profile";
import Products from "../Pages/Admin/Products/Products";
import ProductDetails from "../Components/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import NavOptions from "../Pages/Shared/Navbar/SmallDNav/NavOptions";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Order from "../Pages/Order/Order";
import UserDashboard from "../Layouts/UserDashboard";
import Checkout from "../Pages/Checkout/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile-options",
        element: (
          <ProtectedRoute>
            <NavOptions />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // user dashboard
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "manage-account",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <Order />,
      },
    ],
  },

  // admin routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <h1>hello world</h1>,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "orders",
        element: <h1>hello world</h1>,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
    ],
  },

  // non-admin routes for warning
  {
    path: "/no-access",
    element: (
      <ProtectedRoute>
        <NoAccess />
      </ProtectedRoute>
    ),
  },

  // auth routes
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
