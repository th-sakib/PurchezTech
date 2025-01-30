import {
  RiDashboardFill,
  RiSidebarUnfoldFill,
  RiUserSettingsFill,
} from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { BsFillCartCheckFill } from "react-icons/bs";
import { LuBaggageClaim, LuLogOut } from "react-icons/lu";
import logo from "../assets/images/Logo/main-logo-fn.png";

import { Link, NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../redux/api/apiSlice";
import { toast } from "../lib/sweetAlert/toast";
import { clearUser } from "../redux/features/user/userSlice";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await logoutUser().unwrap();
      dispatch(clearUser());
      if (res.success === true) {
        toast.fire({
          icon: "warning",
          title: "You are logged out!",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sidebarContentLinks = [
    {
      id: "dashboard",
      path: "dashboard",
      label: "Dashboard",
      icon: <RiDashboardFill className="mt-1 text-lg" />,
    },
    {
      id: "products",
      path: "products",
      label: "Products",
      icon: <LuBaggageClaim className="mt-1 text-lg" />,
    },
    {
      id: "orders",
      path: "orders",
      label: "Orders",
      icon: <BsFillCartCheckFill className="mt-1 text-lg" />,
    },
    {
      id: "users",
      path: "users",
      label: "Users",
      icon: <RiUserSettingsFill className="mt-1 text-lg" />,
    },
  ];

  const sidebarContent = (
    <nav className="menu mr-12 min-h-screen w-full border-r bg-white px-4 py-4 text-base-content">
      {/* sidebar HEADER  */}
      <div className="mb-6 flex items-center justify-between text-2xl">
        <div className="flex items-center gap-2">
          {/* logo part  */}
          <section className="flex">
            <Link to={"/admin/dashboard"}>
              <img
                src={logo}
                alt="PurchezTech Logo"
                className="aspect-square h-auto w-8"
              />
            </Link>
            <Link
              to={"/admin/dashboard"}
              className="-mx-4 mt-[.7rem] font-josefin_sans text-xl font-extrabold logoMd:-mx-2 logoMd:mt-[.5rem]"
            >
              <span>urch</span>
              EZ
              <span>Tech</span>
            </Link>
          </section>
        </div>
        <RxCross2
          className="absolute right-1 top-1 cursor-pointer text-base hover:text-accent-color lg:hidden"
          onClick={toggleDrawer}
        />
      </div>

      <section className="flex h-full flex-col justify-between">
        <div>
          {sidebarContentLinks.map((item) => (
            <li key={item.id} onClick={toggleDrawer}>
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <>
                    <span className={`${isActive ? "text-accent-color" : ""}`}>
                      {item.icon}
                    </span>
                    <span
                      className={`${isActive ? "font-bold text-black" : ""}`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </div>

        <div>
          <li
            className="flex cursor-pointer flex-row items-center rounded-lg font-bold hover:bg-[#1f29371a]"
            onClick={logoutHandler}
          >
            <div className="">
              <LuLogOut className="mt-1 text-error" />
            </div>
            <h3 className="-ml-2 p-0 hover:bg-transparent active:!bg-transparent active:!text-gray-800">
              Logout
            </h3>
          </li>
        </div>
      </section>
    </nav>
  );

  return (
    <div className="flex flex-row-reverse font-sans text-primary-color">
      {/* Second part of layout (non sidebar) */}
      <div className="w-full">
        {/* sidebar toggler  */}
        <RiSidebarUnfoldFill
          className="absolute top-6 cursor-pointer text-3xl hover:text-accent-color lg:hidden"
          onClick={toggleDrawer}
        />
        <div className="ml-6 min-h-screen bg-background-color lg:ml-0">
          <Outlet />
        </div>
      </div>

      {/* Side bar - drawer */}
      <div
        className={`drawer min-h-screen w-0 bg-white shadow-md lg:drawer-open lg:w-fit ${
          isDrawerOpen ? "drawer-open" : ""
        }`}
      >
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsDrawerOpen(false)}
          ></label>

          {/* Sidebar content here */}
          {sidebarContent}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
