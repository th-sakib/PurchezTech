import { Navigate, useLocation } from "react-router-dom";
import { useGetUserQuery } from "../redux/api/apiSlice";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "../redux/features/user/userSlice";

// TODO: have to implement the isAuthecated or not logic from redux store (hint: maybe need to fetch cookies)
const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // rtk query
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  // helpler functions
  const nonProtectedPage = () => {
    location.pathname === "/";
  };

  const isAuthPage = () =>
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  const isAdminPage = () => location.pathname.startsWith("/admin/dashboard");

  //   const isShopPage = () => location.pathname.includes("/");

  // if unauthenticated and go to non protected route
  if (!isAuthenticated && nonProtectedPage()) {
    return children;
  }

  // if user not authenticated
  if (!isAuthenticated && !isAuthPage()) {
    return <Navigate to="/auth/login" replace />;
  }

  // if user authenticated and still try to access auth pages and he is admin or customer
  if (isAuthenticated && isAuthPage()) {
    if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // if user authenticated and not admin but try to access admin pages
  if (isAuthenticated && userRole !== "admin" && isAdminPage()) {
    return <Navigate to="/non-admin" replace />;
  }

  // if user authenticated and admin but try to shop pages
  if (isAuthenticated && userRole === "admin" && !isAdminPage()) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;
