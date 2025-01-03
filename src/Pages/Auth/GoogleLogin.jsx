import { GrGoogle } from "react-icons/gr";
import Button from "../../Components/Button";
import { useGoogleLoginMutation } from "../../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { toast } from "../../lib/sweetAlert/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/user/userSlice";

import { useGoogleLogin } from "@react-oauth/google";

const GoogleLogin = () => {
  const [googleLogin, { isLoading }] = useGoogleLoginMutation();

  const dispatch = useDispatch();

  // getting the location of previous page from this page visited
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        // or authResult?.code
        const res = await googleLogin(authResult?.code).unwrap();

        dispatch(
          setUser({
            ...res?.data.googleLoggedUser,
            accessToken: res.data.accessToken,
          })
        );
        sessionStorage.setItem("token", JSON.stringify(res.data.accessToken));

        toast.fire({
          title: "You are successfully logged in",
          icon: "success",
          timer: 3000,
        });
        navigate(from);
      }
    } catch (error) {
      console.log("Error while requesting google code: ", error?.data?.message);
    }
  };

  // onclick handler | when the onclick handler is called the useGoogleLogin will trigger and return some value on success or on error (if they exist)
  const googleSignInHandler = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div>
      <Button
        btnHandler={googleSignInHandler}
        className="w-full bg-transparent border-black text-accent-color hover:bg-on-hover hover:text-white capitalize flex items-center justify-center"
      >
        <GrGoogle className="text-base drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mt-1">
          login with google
        </p>
      </Button>
    </div>
  );
};

export default GoogleLogin;
