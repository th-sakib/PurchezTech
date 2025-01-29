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
    <header className="flex w-full items-center bg-white px-8 py-3 font-josefin_sans">
      <Button
        btnHandler={logoutHandler}
        className="ml-auto font-normal text-white"
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
