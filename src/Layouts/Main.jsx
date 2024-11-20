import { Navigate, Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useSelector } from "react-redux";
import { selectUserRole } from "../redux/features/user/userSlice";

const Main = () => {
  const userRole = useSelector(selectUserRole);
  console.log(userRole);

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
