import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useEffect } from "react";
import { useLazyGetAuthenticityQuery } from "../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUserRole } from "../redux/features/user/userSlice";

const Main = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);

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

  return userRole !== "admin" ? (
    <>
      <div className="mx-auto sticky top-0 left-0 z-50 border-b border-slate-300 bg-white">
        <Navbar></Navbar>
      </div>
      <div className="text-primary-color">
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  ) : (
    <Navigate to="admin/dashboard" replace />
  );
};

export default Main;
