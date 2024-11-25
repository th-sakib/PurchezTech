import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { BsFillEyeFill } from "react-icons/bs";
import { FaUser, FaUserEdit } from "react-icons/fa";

// imports which related to redux-toolkit / rtk-query
import { useRegisterUserMutation } from "../../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setRegistrationEmail } from "../../redux/features/user/userSlice";
import { toast } from "../../lib/sweetAlert/toast";

const Signup = () => {
  const [passView, setPassView] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // rtk / rtk query
  const dispatch = useDispatch();
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  // onsubmit handler
  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();

      // setting user data to state
      dispatch(setRegistrationEmail(data.email));

      reset();

      toast.fire({
        title: "You're successfully signed up",
        icon: "success",
      });
      navigate("/auth/login");
    } catch (err) {
      console.log(err?.data?.message);
      console.log(error?.data?.errors?.[0]?.message);
    }
  };

  return (
    <>
      {/* welcome section  */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* full name */}
        <div className="relative group h-5">
          <input
            className={`outline-none w-full bg-transparent border-b ${
              errors?.fullName ? "border-red-600" : "border-secondary-color"
            }`}
            {...register("fullName", {
              required: {
                value: true,
                message: "Fullname is required",
              },
              minLength: {
                value: 3,
                message: "Use at least 3 char",
              },
              maxLength: {
                value: 747,
                message: "Can't use more than 3 char",
              },
            })}
            type="text"
            name="fullName"
            placeholder="Full Name"
          />
          <FaUserEdit
            className={`absolute top-1 right-1 group-focus-within:text-accent-color text-[1.2rem] ${
              errors?.fullName && "text-red-600"
            }`}
          />
          <p className="text-red-600 text-xs">{errors?.fullName?.message}</p>
        </div>

        {/* username  */}
        <div className="relative group h-5">
          <input
            className={`outline-none w-full bg-transparent border-b ${
              errors?.username ? "border-red-600" : "border-secondary-color"
            }`}
            {...register("username", {
              required: {
                value: true,
                message: "username is required",
              },
              minLength: {
                value: 4,
                message: "Use at least 4 char",
              },
              maxLength: {
                value: 10,
                message: "Can't use more than 10 char",
              },
              // pattern: {
              //   value: /(?!.*[\.\-\_]{2,})^[a-z0-9\.\-\_]/,
              //   message: "Use lowercase & no space",
              // },
              validate: {
                hasUppercase: (value) =>
                  !/[A-Z]/.test(value) || "Can't use uppercase letters",
                hasSpecialChar: (value) =>
                  !/^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(value) ||
                  "Don't use special char",
              },
            })}
            type="username"
            name="username"
            autoComplete="username"
            placeholder="Username"
          />
          <FaUser
            className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
              errors?.username && "text-red-600"
            }`}
          />
          <p className="text-red-600 text-xs">{errors?.username?.message}</p>
        </div>

        {/* email  */}
        <div className="relative group h-5">
          <input
            className={`outline-none w-full bg-transparent border-b ${
              errors?.email ? "border-red-600" : "border-secondary-color"
            }`}
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/,
                message: "Invalid Email address",
              },
            })}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
          />
          <MdEmail
            className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
              errors?.email && "text-red-600"
            }`}
          />
          <p className="text-red-600 text-xs">{errors?.email?.message}</p>
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
            autoComplete="new-password"
            placeholder="Password"
          />

          {/* icon inside input  */}
          <button type="btn" onClick={() => setPassView(!passView)}>
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
          {/* error message  */}
          <p className="text-red-600 text-xs break-words">
            {errors?.password?.message}
          </p>
        </div>

        {/* error from server  */}
        {isError && (
          <div className="text-red-500 text-sm mt-2">
            {error?.data?.message || "Something went wrong. Please try again."}
          </div>
        )}

        <Button btnType="submit" className="text-white w-full">
          {isLoading ? "Creating accout.." : "Create Account"}
        </Button>

        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Signup;
