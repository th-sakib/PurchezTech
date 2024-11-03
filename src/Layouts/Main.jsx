import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <>
      <div className="mx-auto sticky top-0 left-0 z-50 border-b border-slate-300 bg-white">
        <Navbar></Navbar>
      </div>
      <div className="text-primary-color">
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Main;
