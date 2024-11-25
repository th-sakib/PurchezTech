import { RiDashboardFill, RiSidebarUnfoldFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { BsFillCartCheckFill } from "react-icons/bs";
import { LuBaggageClaim } from "react-icons/lu";
import { AiOutlineDashboard } from "react-icons/ai";

import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../Pages/Admin/Header/Header";

const AdminLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sidebarContentLinks = [
    {
      id: "dashboard",
      path: "dashboard",
      label: "Dashboard",
      icon: <RiDashboardFill />,
    },
    {
      id: "products",
      path: "products",
      label: "Products",
      icon: <LuBaggageClaim />,
    },
    {
      id: "orders",
      path: "orders",
      label: "Orders",
      icon: <BsFillCartCheckFill />,
    },
  ];

  const sidebarContent = (
    <nav className="menu text-base-content min-h-full p-4 w-full bg-white">
      {/* sidebar HEADER  */}
      <div className="text-2xl flex items-center justify-between">
        <div className=" flex gap-2 items-center">
          <AiOutlineDashboard /> <h1 className="font-bold">Admin Panel</h1>
        </div>
        <RxCross2 className="cursor-pointer lg:hidden" onClick={toggleDrawer} />
      </div>

      <div className="divider " />

      {sidebarContentLinks.map((item) => (
        <li key={item.id}>
          <NavLink to={item.path}>
            {item.icon}
            {item.label}
          </NavLink>
        </li>
      ))}
    </nav>
  );

  return (
    <div className="bg-background-color font-sans text-primary-color flex flex-row-reverse">
      {/* Second part of layout (non sidebar) */}
      <div className="w-full">
        <Header />
        <Outlet />
      </div>

      {/* Side bar - drawer */}
      <div
        className={`drawer lg:drawer-open bg-white shadow-md w-1/4 ${
          isDrawerOpen ? "drawer-open" : ""
        } lg:block`}
      >
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            {/* toggle sidebar button */}
            <RiSidebarUnfoldFill className="" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="lg:shadow-md close bg-white sidebar"
          ></label>

          {/* Sidebar content here */}
          {sidebarContent}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
