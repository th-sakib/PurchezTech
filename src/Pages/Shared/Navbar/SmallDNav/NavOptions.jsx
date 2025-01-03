import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useLogoutUserMutation } from "../../../../redux/api/apiSlice";
import { toast } from "../../../../lib/sweetAlert/toast";
import { clearUser } from "../../../../redux/features/user/userSlice";

const NavOptions = () => {
  const dispatch = useDispatch();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const location = useLocation();

  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser());
      sessionStorage.clear();

      toast.fire({
        icon: "warning",
        title: "You are logged out!",
      });
    } catch (err) {
      console.log(err?.data?.message);
    }
  };

  return (
    <div className="capitalize h-[90vh] mx-6 flex flex-col justify-center items-center text-white">
      <section className="">
        <NavLink
          to="/my-profile"
          className="text-center py-3 my-4 bg-accent-color/80 w-72 block"
        >
          my profile
        </NavLink>
        <NavLink
          to="/my-order"
          className="text-center py-3 my-4 bg-accent-color/80 w-72 block"
        >
          my order
        </NavLink>
        <button
          onClick={handleLogout}
          className="text-center py-3 my-4 bg-accent-color/80 w-72 block"
        >
          logout
        </button>
      </section>
    </div>
  );
};

export default NavOptions;
