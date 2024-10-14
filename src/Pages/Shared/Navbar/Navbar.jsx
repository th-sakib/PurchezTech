import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/Logo/main-logo-fn.png";
import { IoHome, IoHomeOutline, IoSearchSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { LuMail } from "react-icons/lu";
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { RiContactsBook3Line, RiContactsBookFill } from "react-icons/ri";
import {
  BiComment,
  BiInfoSquare,
  BiSolidComment,
  BiSolidInfoSquare,
} from "react-icons/bi";
import Button from "../../../Components/Button";

const Navbar = () => {
  const navOptions = (
    <>
      <li>
        <NavLink to="/">
          {({ isActive }) => (
            <>{isActive ? <IoHome /> : <IoHomeOutline />} Home</>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/all-products"}>
          {({ isActive }) => (
            <>
              {isActive ? <AiFillProduct /> : <AiOutlineProduct />} All Products
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs">
          {({ isActive }) => (
            <>{isActive ? <BiSolidComment /> : <BiComment />} Blogs</>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact">
          {({ isActive }) => (
            <>
              {isActive ? <RiContactsBookFill /> : <RiContactsBook3Line />}{" "}
              Contact us
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us">
          {({ isActive }) => (
            <>{isActive ? <BiSolidInfoSquare /> : <BiInfoSquare />} About Us</>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full shadow-md">
      <div className="navbar bg-base-100 px-9">
        {/* navbar start */}
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
          <Link to={"/"} className="-mx-2 text-xl">
            <span className="font-sankofa font-semibold">u</span>r
            <span className="font-sankofa font-semibold">c</span>h
            <span className="text-xl px-1 font-sankofa inline-block transform translate-y-[-2px] bg-primary-color text-white mt-2 ">
              EZ
            </span>
            <span className="font-sankofa font-semibold ml-[.2rem]">T</span>e
            <span className="font-sankofa font-semibold">c</span>h
          </Link>
        </div>
        {/* middle */}
        <div className="navbar-center hidden lg:flex max-h-11">
          <div className="flex justify-center flex-col items-center">
            <div className="block">
              {/* searchbox */}
              <div className={`join rounded-none items-center justify-center`}>
                <input
                  type="text"
                  placeholder="Search for your desired Products"
                  className="input join-item focus:outline-none w-[30vw] h-11"
                />
                <button className="btn bg-primary-color text-white rounded-sm font-bolder text-base h-11 min-h-11 hover:bg-[#111010]">
                  <IoSearchSharp />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="navbar-end">
          <div className="flex space-x-7 items-center">
            {/*TODO: add a input field for search not animation*/}
            <HiOutlineShoppingCart className="text-xl cursor-pointer" />
            <LuMail className="text-xl cursor-pointer" />
            <Button>Login</Button>
          </div>
        </div>
      </div>
      {/* nav bot-middle menues */}
      <div className="navbar text-center hidden lg:block z-40 w-full bg-base-100">
        <ul className="menu menu-horizontal px-1 space-x-5 font-bold uppercase">
          {navOptions}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
