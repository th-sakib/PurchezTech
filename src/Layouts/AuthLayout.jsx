import React from "react";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-background-color flex justify-center items-center">
      <div className="md:h-[60vh] w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] flex flex-col-reverse md:flex-row justify-between items-center border border-accent-color relative overflow-hidden">
        <span className="hidden md:block w-[850px] h-[600px] bg-accent-color absolute -top-52 -right-[30rem] md:-right-[24rem] lg:-right-80 skew-y-[40deg] rotate-[10deg] border-b-2 border-on-hover"></span>

        {/* the cross sign  */}
        <HiMiniArrowLeft
          className="absolute top-2 right-2 text-white cursor-pointer text-xl"
          onClick={() => navigate(-1)}
        />

        {/* form section  */}
        <section className="p-10 w-full md:w-1/2 z-20">
          <h1 className="self-stretch text-center text-3xl font-bold mb-4 uppercase">
            Login
          </h1>
          <Outlet></Outlet>
        </section>
        {/* welcome section  */}
        <section className="w-full md:w-1/2 h-[40vh] md:h-full text-white  flex flex-col items-center md:items-end justify-center overflow-hidden bg-accent-color md:bg-transparent ">
          {/* text-div  */}
          <div className="z-50 text-center md:text-right px-5">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 uppercase">
              Welcome <br /> back !
            </h2>
            <div className="md:text-sm lg:text-base">
              <p className="tracking-[0.07rem]">log in to access your</p>
              <p className="tracking-[0.023rem]">account and continue</p>
              <p className="tracking-wide">enjoying a premium</p>
              <p className="tracking-tighter">shopping experience !</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;
