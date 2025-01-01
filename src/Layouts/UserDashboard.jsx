import { BsFillCartCheckFill } from "react-icons/bs";
import { MdRemoveShoppingCart } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import SmallDNav from "../Pages/Shared/Navbar/SmallDNav/SmallDNav";
import { FaUser } from "react-icons/fa";

const UserDashboard = () => {
  const sidebarContentLinks = [
    {
      id: "manage-account",
      path: "manage-account",
      label: "Manage Account",
      icon: <FaUser />,
    },
    {
      id: "orders",
      path: "orders",
      label: "Orders",
      icon: <BsFillCartCheckFill />,
    },
    {
      id: "cancellation",
      path: "cancellation",
      label: "Cancellation",
      icon: <MdRemoveShoppingCart />,
    },
  ];

  return (
    <>
      <div className="">
        <Navbar />
        {/* small devices navbar  */}
        <div className="fixed z-50 bottom-2 left-2/4 -translate-x-2/4  md:hidden">
          <SmallDNav />
        </div>
      </div>

      <div className="font-sans text-primary-color flex flex-row-reverse justify-end overflow-hidden">
        {/* Second part of layout (non sidebar) */}
        <div className="w-full h-[89.7vh]">
          <Outlet />
        </div>

        {/* Side bar - drawer */}
        <nav className="menu text-base-content min-h-full py-9 md:py-4 px-2 bg-white h-fit m-2 md:m-0 shadow-2xl md:shadow-none  md:h-screen md:block md:w-[35%] lg:w-[30%] rounded-full md:rounded-none border border-accent-color md:border-none">
          {sidebarContentLinks.map((item) => (
            <li key={item.id}>
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <>
                    <span className={`${isActive ? "text-accent-color" : ""}`}>
                      {item.icon}
                    </span>
                    <span
                      className={`hidden md:block ${
                        isActive ? "text-black font-bold" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </nav>
      </div>
    </>
  );
};

export default UserDashboard;
