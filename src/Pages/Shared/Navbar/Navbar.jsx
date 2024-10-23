import { Link, NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const isHome = location.pathname === "/" || location.pathname === "home";

  const navOptions = (
    <>
      <li className="">
        <NavLink to="/">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-2 px-3">
              {isActive ? <IoHome /> : <IoHomeOutline />} <p>home</p>
            </div>
          )}
        </NavLink>
      </li>
      <li className="active:bg-transparent">
        <NavLink to={"/all-products"}>
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-2 px-3">
              {isActive ? <AiFillProduct /> : <AiOutlineProduct />}{" "}
              <p>All Products</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-2 px-3">
              {isActive ? <BiSolidComment /> : <BiComment />} <p>Blogs</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-2 px-3">
              {isActive ? <RiContactsBookFill /> : <RiContactsBook3Line />}{" "}
              <p>Contact us</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-2 px-3">
              {isActive ? <BiSolidInfoSquare /> : <BiInfoSquare />}{" "}
              <p>About Us</p>
            </div>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`${
        isHome
          ? "fixed top-0 left-0 w-full bg-hero-background font-josefin_sans"
          : "fixed top-0 left-0 w-full bg-hero-background font-josefin_sans shadow-2xl"
      }`}
    >
      <div className="navbar px-9">
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
              className="flex menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
          <Link
            to={"/"}
            className="-mx-2 mt-3 text-xl font-josefin_sans font-extrabold"
          >
            <span className="">urch</span>
            {/* <span className="text-xl font-sankofa px-1 inline-block transform translate-y-[-2px] bg-textC text-white mt-2 font-normal">
              EZ
            </span> */}
            EZ
            {/* the TECH part  */}
            <span>Tech</span>
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
                  className="input bg-transparent join-item focus:outline-none w-[30vw] h-11 border-white focus:border-on-hover "
                />
                <button className="btn bg-white border-white text-on-hover rounded-sm font-bolder text-base h-11 min-h-11 hover:bg-white hover:border-white">
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
            <HiOutlineShoppingCart className="text-xl cursor-pointer hover:text-on-hover" />
            <LuMail className="text-xl cursor-pointer hover:text-on-hover" />
            <Button login>Login</Button>
          </div>
        </div>
      </div>
      {/* nav bot-middle menues */}
      <div className="navbar text-center hidden lg:block z-40 w-full">
        <ul className="flex justify-center items-center px-1 space-x-5 font-bold uppercase">
          {navOptions}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
