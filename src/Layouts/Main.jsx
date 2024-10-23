import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto text-textC">
        <Navbar></Navbar>
      </div>
      <div>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Main;
