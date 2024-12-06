import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../../redux/api/apiSlice";
import {
  clearRegistrationEmail,
  selectRegistrationEmail,
  setUser,
} from "../../redux/features/user/userSlice";
import { toast } from "../../lib/sweetAlert/toast";
import GoogleLogin from "./GoogleLogin";

import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const [passView, setPassView] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // rtk / rtk query
  const dispatch = useDispatch();
  const registerEmail = useSelector(selectRegistrationEmail);

  useEffect(() => {
    if (registerEmail) {
      setValue("usernameOREmail", registerEmail); // setting email
      dispatch(clearRegistrationEmail()); // clearing the state | as it is a temporary state
    }
  }, [dispatch, registerEmail, setValue]);

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  // getting the location of previous page from this page visited
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  // on submit handler
  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      reset();

      dispatch(setUser({ ...res.data.loggedInUser }));
      toast.fire({
        title: "You are successfully logged in",
        icon: "success",
        timer: 3000,
      });
      navigate(from);
    } catch (error) {
      console.log(error?.data?.errors?.[0]?.message);
      // console.log(error?.data?.stack);
      // console.log(error?.stack);
    }
  };

  return (
    <>
      {/* welcome section  */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="relative group h-8">
          {/* Email or Username */}
          <input
            className={`outline-none w-full bg-transparent border-b ${
              errors?.usernameOREmail
                ? "border-red-600"
                : "border-secondary-color"
            }`}
            {...register("usernameOREmail", {
              required: {
                value: true,
                message: "Username or Email is required",
              },
              validate: (value) => {
                const isUsername =
                  /^(?!.*[\.\-\_]{2})(?=[a-z0-9])[a-z0-9._-]{4,10}(?<![\.\-\_])$/.test(
                    value
                  );
                const isEmail =
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/.test(
                    value
                  );
                return (
                  isEmail || isUsername || "Enter a valid email or username"
                );
              },
            })}
            type="text"
            name="usernameOREmail"
            autoComplete="email"
            defaultValue={registerEmail || ""}
            placeholder="Email or Username"
          />
          <MdEmail
            className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
              errors?.usernameOREmail && "text-red-600"
            }`}
          />
          <p className="text-red-600 text-sm">
            {errors?.usernameOREmail?.message}
          </p>
        </div>

        {/* password  */}
        <div className="relative group h-5 pb-10">
          <input
            className={`outline-none w-full bg-transparent border-b ${
              errors?.password ? "border-red-600" : "border-secondary-color"
            }`}
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Use at least 8 char",
              },
              validate: {
                hasLowercase: (value) =>
                  /[a-z]/.test(value) || "Use at least one lowercase letter",
                hasUppercase: (value) =>
                  /[A-Z]/.test(value) || "Use at least one uppercase letter",
                hasSpecialChar: (value) =>
                  /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(value) ||
                  "Use one special char",
                hasNumber: (value) =>
                  /[0-9]/.test(value) || "Use at least one number",
              },
            })}
            type={!passView ? "password" : "text"}
            name="password"
            autoComplete="current-password"
            placeholder="Password"
          />

          {/* eye icon button */}
          <button type="button" onClick={() => setPassView(!passView)}>
            {passView ? (
              <BsFillEyeFill
                className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
                  errors?.password && "text-red-600"
                }`}
              />
            ) : (
              <TbEyeClosed
                className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
                  errors?.password && "text-red-600"
                }`}
              />
            )}
          </button>
          <p className="text-red-600 text-xs break-words">
            {errors?.password?.message}
          </p>
        </div>

        {/* server error  */}
        {isError && (
          <div className="text-red-500 text-sm mt-2">
            {error?.data?.message || "Something went wrong. Please try again."}
          </div>
        )}

        {/* submit button  */}
        <div className="flex flex-col gap-2">
          <Button btnType="submit" className="text-white w-full">
            {isLoading ? "Logging in..." : "Log in"}
          </Button>

          {/* google login  */}
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin />
          </GoogleOAuthProvider>

          <div className="text-center">
            <p className="text-sm">
              New here?{" "}
              <Link to="/auth/register" className="underline" state={from}>
                create account
              </Link>
              ?
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
