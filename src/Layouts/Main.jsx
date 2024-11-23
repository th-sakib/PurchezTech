import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useEffect } from "react";
import { useLazyGetUserQuery } from "../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  selectIsAuthenticated,
  selectUserRole,
} from "../redux/features/user/userSlice";

const Main = () => {
  const dispatch = useDispatch();
  // selectors from redux-slice
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  // refresh token endpoint
  const [getUserTrigger, { isLoading }] = useLazyGetUserQuery();

  // refresh token in component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUserTrigger();
      } catch (error) {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [getUserTrigger, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
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
