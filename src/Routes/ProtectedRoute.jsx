import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // helpler functions
  const isAuthPage = () =>
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  const isAdminPage = () => location.pathname.includes("/admin/dashboard");

  //   const isShopPage = () => location.pathname.includes("/");

  // if user not authenticated
  if (!isAuthenticated && !isAuthPage()) {
    return <Navigate to="/auth/login" replace />;
  }

  // if user authenticated and still try to access auth pages and he is admin or customer
  if (isAuthenticated && isAuthPage()) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // if user authenticated and not admin but try to access admin pages
  if (isAuthenticated && user?.role !== "admin" && isAdminPage()) {
    return <Navigate to="/non-admin" replace />;
  }

  // if user authenticated and admin but try to shop pages
  if (isAuthenticated && user?.role === "admin" && !isAdminPage()) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

export default ProtectedRoute;
