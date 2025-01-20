import { BsCartXFill, BsFillCartCheckFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import SmallDNav from "../Pages/Shared/Navbar/SmallDNav/SmallDNav";
import { FaUser } from "react-icons/fa";
import { useLogoutUserMutation } from "../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/features/user/userSlice";
import { toast } from "../lib/sweetAlert/toast";

const UserDashboard = () => {
  const sidebarContentLinks = [
    {
      id: "manage-account",
      path: "manage-account",
      label: "Manage Account",
      icon: <FaUser className="h-4 w-4" />,
    },
    {
      id: "orders",
      path: "orders",
      label: "Orders",
      icon: <BsFillCartCheckFill className="h-4 w-4" />,
    },
    {
      id: "cancelled",
      path: "cancelled",
      label: "Cancelled products",
      icon: <BsCartXFill className="h-4 w-4" />,
    },
  ];

  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser());

      toast.fire({
        icon: "warning",
        title: "You are logged out!",
      });
    } catch (err) {
      console.log(err?.data?.message);
    }
  };

  return (
    <div className="bg-white">
      {/* lg devices nav  */}
      <div className="mx-auto sticky top-0 left-0 z-50 border-b border-slate-300 bg-white">
        <Navbar />
      </div>
      {/* small devices navbar  */}
      <div className="fixed z-50 bottom-2 left-2/4 -translate-x-2/4  md:hidden">
        <SmallDNav />
      </div>

      <div className="md:max-w-[88%] max-w-[90vw] lg:max-w-[95vw] xxl:max-w-[1450px] mx-auto font-sans text-primary-color flex flex-row-reverse md:gap-12 justify-end bg-white relative">
        {/* Second part of layout (non sidebar) */}
        <div className="w-full bg-white">
          <Outlet />
        </div>

        {/* Side bar - drawer */}
        <nav className="fixed top-12 left-1 md:left-auto menu text-base-content py-9 md:py-4 px-2 bg-white md:h-screen m-2 md:ml-3  md:block border-r border-slate-300 border-b md:border-b-0">
          {sidebarContentLinks.map((item) => (
            <li key={item.id} className="text-base">
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

          <button
            className="flex justify-center items-center hover:text-error md:hidden mt-2 ml-1"
            type="button"
            onClick={handleLogout}
          >
            <IoLogOut className="h-4 w-4" />
          </button>
        </nav>
        <div className="min-w-14 md:min-w-40"></div>
      </div>
    </div>
  );
};

export default UserDashboard;
