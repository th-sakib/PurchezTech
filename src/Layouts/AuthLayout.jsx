import React from "react";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const from = location?.state?.from || location?.state || "/";

  return (
    <div className="h-screen bg-background-color flex justify-center items-center">
      <div
        className={`md:h-[60vh] w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] flex flex-col-reverse overflow-hidden ${
          pathname === "/auth/register" ? "md:flex-row-reverse" : "md:flex-row"
        } justify-between items-center border border-accent-color relative`}
      >
        {/* login page animation */}
        <span
          className={`hidden lg:block w-[100vw] h-[100vh] bg-accent-color absolute border-2 border-on-hover transition-all duration-300 ${
            pathname === "/auth/login"
              ? "-top-[14rem] lg:-right-[43rem] xl:-right-[40rem] rotate-[44deg]"
              : "-top-0 lg:right-[11rem] xl:right-[8rem] rotate-[44deg]"
          }`}
          // -top-72 right-[30rem] md:right-[31rem] lg:right-[37rem]
        ></span>

        {/* the cross sign  */}
        <HiMiniArrowLeft
          className={`absolute top-2 right-2 cursor-pointer text-xl z-50 ${
            pathname === "/auth/login" ? "text-white" : "text-black"
          } `}
          onClick={() => navigate(from)}
        />
        {/* form section  */}
        <section className={`p-10 w-full md:w-1/2 z-20`}>
          <h1 className="self-stretch text-center text-3xl font-bold mb-4 uppercase">
            {pathname === "/auth/login" ? "login" : "signup"}
          </h1>
          <Outlet></Outlet>
        </section>
        {/* welcome section  */}
        <section
          className={`w-full md:w-1/2 h-[40vh] md:h-full text-white  flex flex-col items-center ${
            pathname === "/auth/login" ? "md:items-end" : "md:items-start"
          } justify-center overflow-hidden bg-accent-color lg:bg-transparent `}
        >
          {/* text-div  */}
          <div
            className={`z-50 text-center ${
              pathname === "/auth/login" ? "md:text-right" : "md:text-left"
            } px-5`}
          >
            {pathname === "/auth/login" ? (
              <>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 uppercase">
                  Welcome <br /> back !
                </h2>
                <div className="md:text-sm lg:text-base">
                  <p className="tracking-[0.07rem]">log in to access your</p>
                  <p className="tracking-[0.023rem]">account and continue</p>
                  <p className="tracking-wide">enjoying a premium</p>
                  <p className="tracking-tighter">shopping experience !</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 uppercase">
                  Create <br />
                  an Account
                </h2>
                <div className="md:text-sm lg:text-base">
                  <p className="tracking-[0.01rem]">Sign up to create your</p>
                  <p className="tracking-[0.017rem]">account and get started</p>
                  <p className="tracking-[.01rem]">with an amazing shopping</p>
                  <p className="tracking-tighter">
                    experience tailored just for you!
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;
