import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../../redux/api/apiSlice";
import { setUser } from "../../redux/features/user/userSlice";

const Login = () => {
  const [passView, setPassView] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // rtk / rtk query
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  // getting the location of previous page from this page visited
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  // on submit handler
  const onSubmit = async (data) => {
    const res = await loginUser(data);
    reset();
    dispatch(setUser({ ...res }));
    navigate(from);
  };

  return (
    <>
      {/* welcome section  */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="relative group">
          {/* Email or Username */}
          <input
            className="outline-none w-full bg-transparent border-b border-secondary-color "
            {...register("email", { required: true })}
            type="email"
            name="email"
            defaultValue={userInfo?.email || ""}
            placeholder="Email or Username"
          />
          <MdEmail className="absolute top-1 right-2 group-focus-within:text-accent-color" />
        </div>

        <div className="relative group">
          {/* password  */}
          <input
            className="outline-none w-full bg-transparent border-b border-secondary-color"
            {...register("password", { required: true })}
            type={passView ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <button type="button" onClick={() => setPassView(!passView)}>
            {passView ? (
              <BsFillEyeFill className="absolute top-1 right-2 cursor-pointer group-focus-within:text-accent-color" />
            ) : (
              <TbEyeClosed className="absolute top-1 right-2 cursor-pointer group-focus-within:text-accent-color" />
            )}
          </button>
        </div>

        <Button btnType="submit" className="text-white w-full">
          {isLoading ? "Logging in..." : "Log in"}
        </Button>

        <div className="text-center">
          <p className="text-sm">
            New here?{" "}
            <Link to="/auth/register" className="underline" state={from}>
              create account
            </Link>
            ?
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
