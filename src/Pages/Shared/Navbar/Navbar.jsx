import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/Logo/main-logo-fn.png";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { LuMail } from "react-icons/lu";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navOptions = (
    <>
      <li>
        <NavLink to={"/home"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/categories"}>Categories</NavLink>
      </li>
      <li>
        <NavLink to="/new-arrival">New Arrival</NavLink>
      </li>
      <li>
        <NavLink to="/features">Features</NavLink>
      </li>
      <li>
        <NavLink to="/collections">Collection</NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full">
      {/* navbar start */}
      <div className="navbar bg-base-100 px-9">
        <div className="navbar-start max-h-11">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navOptions}
            </ul>
          </div>
          <Link to={"/"} className="">
            <img
              width={100}
              src={logo}
              alt="PurchezTech Logo"
              className="h-10 w-10"
            />
          </Link>
          <Link to={"/"} className="-mx-2 font-semibold text-xl">
            Purch
            <span className="text-xl px-1 font-sankofa inline-block transform translate-y-[-2px] bg-[#1A1819] text-white mt-2">
              EZ
            </span>
            Tech
          </Link>
        </div>
        {/* middle */}
        <div className="navbar-center hidden lg:flex">
          <div className="flex justify-center flex-col items-center">
            <div className="block">
              {/* searchbox */}
              <div className={`join rounded-none`}>
                <input
                  type="text"
                  placeholder="Search for your desired Products"
                  className="input join-item focus:outline-none w-[30vw]"
                />
                <button className="btn bg-[#1A1819] join-item text-white border-[#1A1819] hover:bg-[#1A1819] hover:border-[#1A1819]">
                  <IoSearchSharp className="text-xl font-semibold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="navbar-end">
          <div className="flex space-x-7">
            {/*TODO: add a input field for search not animation*/}
            <HiOutlineShoppingCart className="text-xl" />
            <LuMail className="text-xl" />
          </div>
        </div>
      </div>
      {/* nav middle menues */}
      <div className="navbar text-center hidden md:block z-40 w-full bg-base-100">
        <ul className="menu menu-horizontal px-1 space-x-8">{navOptions}</ul>
      </div>
    </div>
  );
};

export default Navbar;
