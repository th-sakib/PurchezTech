import { useDispatch, useSelector } from "react-redux";
import robotAvatar from "../../../assets/images/robot-avatar.png";
import { toast } from "../../../lib/sweetAlert/toast";
import { useLogoutUserMutation } from "../../../redux/api/apiSlice";
import { clearUser } from "../../../redux/features/user/userSlice";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaUserGear } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

const Avatar = () => {
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const location = useLocation();

  const userInfo = useSelector((state) => state.user.userInfo);

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser());
    } catch (err) {
      console.log(err);
      console.log(err?.data?.stack);
      console.log(err?.data?.message);
    }
    toast.fire({
      icon: "warning",
      title: "You are logged out!",
    });
  };

  return (
    <div>
      {/* drawer  */}
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="drawer-button">
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
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 drawer-end">
            {/* Sidebar content here */}
            <li>
              <Link to="/your-profile">
                {location?.pathname.includes("/admin") ? (
                  <FaUserGear className="text-base" />
                ) : (
                  <FaUser className="text-base" />
                )}
                Your Profile
              </Link>
            </li>

            {/* logout button  */}
            <li>
              <button onClick={logoutHandler}>
                <FaSignOutAlt className="text-base" />
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
