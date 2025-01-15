import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useEffect } from "react";
import { useLazyGetAuthenticityQuery } from "../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUserRole } from "../redux/features/user/userSlice";
import SmallDNav from "../Pages/Shared/Navbar/SmallDNav/SmallDNav";

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
        console.log(error);
        dispatch(clearUser());
      }
    };

    if (!userRole || userRole === "admin") checkAuth();
  }, [getAuthenticityTrigger, dispatch, userRole]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return userRole !== "admin" ? (
    <div className="relative">
      <div className="mx-auto sticky top-0 left-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <Navbar></Navbar>
      </div>
      {/* small devices navbar  */}
      <div className="fixed z-50 bottom-2 left-2/4 -translate-x-2/4  md:hidden">
        <SmallDNav />
      </div>
      <div className="text-primary-color">
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  ) : (
    <Navigate to="admin/dashboard" replace />
  );
};

export default Main;
