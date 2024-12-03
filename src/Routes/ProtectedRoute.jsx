import { Navigate, useLocation } from "react-router-dom";
import { useLazyGetAuthenticityQuery } from "../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  selectIsAuthenticated,
  selectUserRole,
} from "../redux/features/user/userSlice";
import { useEffect } from "react";

// TODO: have to implement the isAuthenticated or not logic from redux store (hint: maybe need to fetch cookies)
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  const dispatch = useDispatch();

  // refresh token endpoint
  const [getAuthenticityTrigger, { isLoading, isUninitialized }] =
    useLazyGetAuthenticityQuery();

  // refresh token in component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getAuthenticityTrigger();
      } catch (error) {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [getAuthenticityTrigger, dispatch]);

  if (isLoading || isUninitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  const isAuthPage = () =>
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  const isAdminPage = () => location.pathname.startsWith("/admin");

  // if user not authenticated
  if (!isAuthenticated) {
    // console.log("not authenticated");
    if (isAuthPage()) {
      // console.log("not authenticated");
      return children;
    }

    return <Navigate to="/auth/login" replace />;
  }

  // if user authenticated and still try to access auth pages and he is admin or customer
  if (isAuthenticated && isAuthPage()) {
    // console.log("is authenticated and auth page");
    if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // if user authenticated and not admin but try to access admin pages
  if (isAuthenticated && userRole !== "admin" && isAdminPage()) {
    // console.log("authenticated and admin and admin page");
    return <Navigate to="/no-access" replace />;
  }

  // if user authenticated and admin but try to shop pages
  if (isAuthenticated && userRole === "admin" && !isAdminPage()) {
    // console.log("authenticated and admin");
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
