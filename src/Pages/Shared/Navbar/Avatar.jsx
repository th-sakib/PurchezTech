import { useDispatch, useSelector } from "react-redux";
import robotAvatar from "../../../assets/images/robot-avatar.png";
import { toast } from "../../../lib/sweetAlert/toast";
import { useLogoutUserMutation } from "../../../redux/api/apiSlice";
import { clearUser } from "../../../redux/features/user/userSlice";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaUserGear } from "react-icons/fa6";
import { FaSignOutAlt, FaShoppingBag } from "react-icons/fa";

import { useState } from "react";
import { BsCartXFill } from "react-icons/bs";

const Avatar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const location = useLocation();

  const userInfo = useSelector((state) => state.user.userInfo);

  // handlers
  const toggleSidebar = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const logoutHandler = async () => {
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
    <div className="md:ml-4">
      {/* drawer  */}
      <div className="drawer drawer-end">
        <input
          id="my-drawer-on-profile"
          type="checkbox"
          checked={isDrawerOpen}
          onChange={toggleSidebar}
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-on-profile" className="drawer-button">
            {/* avatar  */}
            <div className="avatar">
              <div className="ring-primary-color ring-offset-base-100 h-8 rounded-full ring-2 ring-offset-1 cursor-pointer">
                <img src={userInfo.avatar ? userInfo.avatar : robotAvatar} />
              </div>
            </div>
          </label>
        </div>
        <div className="drawer-side drawer-end">
          <label
            htmlFor="my-drawer-on-profile"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 drawer-end">
            {/* Sidebar content here */}
            <li onClick={() => setIsDrawerOpen(false)}>
              <Link to="/user/manage-account">
                {location?.pathname.includes("/admin") ? (
                  <FaUserGear />
                ) : (
                  <FaUser />
                )}
                My Profile
              </Link>
            </li>

            <li onClick={() => setIsDrawerOpen(false)}>
              <Link to="/user/orders">
                {location?.pathname.includes("/admin") ? (
                  <FaShoppingBag />
                ) : (
                  <FaShoppingBag />
                )}
                Orders
              </Link>
            </li>

            <li onClick={() => setIsDrawerOpen(false)}>
              <Link to="/user/cancelled">
                {location?.pathname.includes("/admin") ? (
                  <FaShoppingBag />
                ) : (
                  <BsCartXFill />
                )}
                Cancelled Products
              </Link>
            </li>

            {/* logout button  */}
            <li onClick={() => setIsDrawerOpen(false)}>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
                {isLoading ? "Logging out" : "Logout"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
