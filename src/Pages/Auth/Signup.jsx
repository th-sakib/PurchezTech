import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { BsFillEyeFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

// imports which related to redux-toolkit / rtk-query
import { useRegisterUserMutation } from "../../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";

const Signup = () => {
  const [passView, setPassView] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  // rtk / rtk query
  const dispatch = useDispatch();
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  // onsubmit handler
  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();

      // setting user data to state
      dispatch(setUser({ ...res.data }));

      reset();

      alert("user sign up successfully!");
      navigate("/auth/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* welcome section  */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="relative group">
          <input
            className="outline-none w-full bg-transparent border-b border-secondary-color"
            {...register("fullName", { required: true })}
            type="text"
            name="fullName"
            placeholder="Full Name"
          />
          <FaUser className="absolute top-1 right-2 group-focus-within:text-accent-color" />
        </div>
        <div className="relative group">
          <input
            className="outline-none w-full bg-transparent border-b border-secondary-color"
            {...register("username", { required: true })}
            type="username"
            name="username"
            placeholder="Username"
          />
          <FaUser className="absolute top-1 right-2 group-focus-within:text-accent-color" />
        </div>

        <div className="relative group">
          <input
            className="outline-none w-full bg-transparent border-b border-secondary-color "
            {...register("email", { required: true })}
            type="email"
            name="email"
            placeholder="Email"
          />
          <MdEmail className="absolute top-1 right-2 group-focus-within:text-accent-color" />
        </div>

        <div className="relative group">
          <input
            className="outline-none w-full bg-transparent border-b border-secondary-color "
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
