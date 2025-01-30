import React from "react";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const from = location?.state?.from || location?.state || "/";

  return (
    <div className="xll:h-screen flex items-center justify-center bg-background-color md:h-screen">
      <div
        className={`my-3 flex w-[90vw] flex-col-reverse overflow-hidden md:my-0 md:w-[80vw] lg:w-[70vw] xl:w-[60vw] xxl:my-0 xxl:w-[80vw] ${
          pathname === "/auth/register" ? "md:flex-row-reverse" : "md:flex-row"
        } relative items-stretch justify-between border border-accent-color xxl:items-center`}
      >
        {/* login page animation - BLUE BOX */}
        <span
          className={`absolute hidden h-[100vh] w-[100vw] border-2 border-on-hover bg-accent-color transition-all duration-300 lg:block xxl:hidden ${
            pathname === "/auth/login"
              ? "-top-[14rem] rotate-[44deg] md:-right-[35rem] xl:-right-[40rem]"
              : "top-4 rotate-[44deg] md:right-[11rem] xl:right-[8rem]"
          }`}
        ></span>

        {/* the arrow left sign  */}
        <HiMiniArrowLeft
          className={`absolute right-2 top-2 z-50 cursor-pointer text-xl ${
            pathname === "/auth/login"
              ? "text-white"
              : "text-white md:text-black"
          } `}
          onClick={() => navigate(from)}
        />

        {/* form section  */}
        <section className={`z-20 w-full p-10 md:w-1/2`}>
          <h1 className="mb-4 self-stretch text-center text-3xl font-bold uppercase xxl:text-[3rem]">
            {/* login and sign up text  */}
            {pathname === "/auth/login" ? "login" : "signup"}
          </h1>
          <Outlet></Outlet>
        </section>

        {/* welcome section  */}
        <section
          className={`flex h-auto w-full flex-col items-center text-white md:w-1/2 ${
            pathname === "/auth/login" ? "md:items-end" : "md:items-start"
          } justify-center overflow-hidden bg-accent-color lg:bg-transparent xxl:h-[50vh] xxl:bg-accent-color`}
        >
          {/* text-div  */}
          <div
            className={`z-50 p-7 text-center md:p-10 ${
              pathname === "/auth/login" ? "md:text-right" : "md:text-left"
            } px-5`}
          >
            {pathname === "/auth/login" ? (
              <>
                <h2 className="mb-4 hidden text-2xl font-bold uppercase md:block lg:text-3xl xxl:text-[4vw] xxl:leading-[4vw]">
                  Welcome <br /> back !
                </h2>
                <h2 className="mb-2 text-2xl font-bold uppercase xxl:hidden">
                  Welcome back !
                </h2>
                <div className="md:text-sm lg:text-base xxl:mt-9 xxl:space-y-[1.5vw] xxl:text-[2vw]">
                  <p className="tracking-[0.07rem] xxl:tracking-[.25rem]">
                    log in to access your
                  </p>
                  <p className="tracking-[0.023rem]">account and continue</p>
                  <p className="tracking-wide">enjoying a premium</p>
                  <p className="tracking-tighter">shopping experience !</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-4 text-2xl font-bold uppercase lg:text-3xl xxl:text-[4vw] xxl:leading-[4vw]">
                  Create <br />
                  an Account
                </h2>
                <div className="md:text-sm lg:text-base xxl:mt-12 xxl:space-y-[1.5vw] xxl:text-[2vw]">
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
