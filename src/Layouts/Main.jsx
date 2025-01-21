import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../redux/features/user/userSlice";
import SmallDNav from "../Pages/Shared/Navbar/SmallDNav/SmallDNav";

const Main = () => {
  const userRole = useSelector(selectUserRole);

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
