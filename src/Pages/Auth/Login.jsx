import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { TbEyeClosed } from "react-icons/tb";
import { BsFillEyeFill } from "react-icons/bs";

const Login = () => {
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
        <div className="relative">
          <input
            className="outline-none w-full bg-transparent border-b border-secondary-color "
            {...register("email", { required: true })}
            type="email"
            name="email"
            placeholder="Email or Username"
          />
          <MdEmail className="absolute top-1 right-2" />
        </div>

        <div className="relative">
          <input
            className="outline-none w-full bg-transparent border-b border-secondary-color"
            {...register("password", { required: true })}
            type={passView ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <button onClick={() => setPassView(!passView)}>
            {passView ? (
              <BsFillEyeFill className="absolute top-1 right-2 cursor-pointer" />
            ) : (
              <TbEyeClosed className="absolute top-1 right-2 cursor-pointer" />
            )}
          </button>
        </div>

        <Button btnType="submit" className="text-white w-full">
          Log in
        </Button>

        <div className="text-center">
          <p className="text-sm">
            New here?{" "}
            <Link to="/auth/register" className="underline">
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
