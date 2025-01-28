import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Components/ErrorPage";
import Contact from "../Pages/Contact/Contact";
import AllProducts from "../Pages/AllProducts/AllProducts/AllProducts";
import Login from "../Pages/Auth/Login";
// import AuthLayout from "../Layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../Pages/Auth/Signup";
import NoAccess from "../Components/NonAdmin";
// import AdminLayout from "../Layouts/AdminLayout";
import Profile from "../Pages/Shared/Profile/Profile";
import Products from "../Pages/Admin/Products/Products";
// import ProductDetails from "../Components/ProductDetails";
// import Cart from "../Pages/Cart/Cart";
import NavOptions from "../Pages/Shared/Navbar/SmallDNav/NavOptions";
// import Wishlist from "../Pages/Wishlist/Wishlist";

import Order from "../Pages/Order/Order";
// import UserDashboard from "../Layouts/UserDashboard";
import Checkout from "../Pages/Checkout/Checkout";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentFails from "../Pages/Payment/PaymentFails";
import PaymentCancel from "../Pages/Payment/PaymentCancel";
import ManageOrder from "../Pages/Admin/ManageOrder/ManageOrder";
// import Cancelled from "../Pages/Order/Cancelled";
import LoaderSpinner from "../Components/LoaderSpinner";
import OrderDetails from "../Components/OrderDetails";
const LazyCart = React.lazy(() => import("../Pages/Cart/Cart"));
const LazyWishlist = React.lazy(() => import("../Pages/Wishlist/Wishlist"));
const LazyAdmin = React.lazy(() => import("../Layouts/AdminLayout"));
const LazyUserDashboard = React.lazy(() => import("../Layouts/UserDashboard"));
const LazyAuthLayout = React.lazy(() => import("../Layouts/AuthLayout"));
const LazyCancelled = React.lazy(() => import("../Pages/Order/Cancelled"));
const LazyProductDetails = React.lazy(() =>
  import("../Components/ProductDetails")
);

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
        path: "product-details/:id",
        element: (
          <React.Suspense fallback={<LoaderSpinner />}>
            <LazyProductDetails />
          </React.Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<LoaderSpinner />}>
              <LazyCart />
            </React.Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <React.Suspense fallback={<LoaderSpinner />}>
              <LazyWishlist />
            </React.Suspense>
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
        <React.Suspense fallback={<LoaderSpinner />}>
          <LazyUserDashboard />
        </React.Suspense>
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
      {
        path: "cancelled",
        element: (
          <React.Suspense fallback={<LoaderSpinner />}>
            <LazyCancelled />
          </React.Suspense>
        ),
      },
    ],
  },

  // admin routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <React.Suspense fallback={<LoaderSpinner />}>
          <LazyAdmin />
        </React.Suspense>
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
        element: <ManageOrder />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "product-details/:id",
        element: (
          <React.Suspense fallback={<LoaderSpinner />}>
            <LazyProductDetails />
          </React.Suspense>
        ),
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
        <React.Suspense fallback={<LoaderSpinner />}>
          <LazyAuthLayout />
        </React.Suspense>
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

  // payment success

  {
    path: "/payment/success/",
    element: (
      <ProtectedRoute>
        <PaymentSuccess />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment/fails/",
    element: (
      <ProtectedRoute>
        <PaymentFails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment/cancel/",
    element: (
      <ProtectedRoute>
        <PaymentCancel />
      </ProtectedRoute>
    ),
  },
]);
