import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { BsFillEyeFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

const Signup = () => {
  const [passView, setPassView] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      {/* welcome section  */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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

        <Button btnType="submit" className="text-white w-full">
          Create Account
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
