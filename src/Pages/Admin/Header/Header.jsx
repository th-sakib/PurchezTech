import { useDispatch } from "react-redux";
import Button from "../../../Components/Button";
import { toast } from "../../../lib/sweetAlert/toast";
import { useLogoutUserMutation } from "../../../redux/api/apiSlice";
import { clearUser } from "../../../redux/features/user/userSlice";
import { RiSidebarUnfoldFill } from "react-icons/ri";

const Header = ({ toggleDrawer }) => {
  const [logoutUser, { isLoading, isError, error }] = useLogoutUserMutation();

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(clearUser());
    } catch (err) {
      console.log(err?.data?.message);
    }
    toast.fire({
      icon: "warning",
      title: "You are logged out!",
    });
  };

  return (
    <div className="flex items-center py-3 w-full bg-white font-josefin_sans px-8">
      {/* sidebar toggler  */}
      <RiSidebarUnfoldFill
        className="text-3xl cursor-pointer lg:hidden hover:text-accent-color"
        onClick={toggleDrawer}
      />
      <Button
        btnHandler={logoutHandler}
        className="ml-auto text-white font-normal"
      >
        Logout
      </Button>
    </div>
  );
};

export default Header;
