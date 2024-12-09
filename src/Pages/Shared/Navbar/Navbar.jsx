import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/images/Logo/main-logo-fn.png";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../Components/Button";
import { useState } from "react";
import { selectIsAuthenticated } from "../../../redux/features/user/userSlice";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  // rtk / rtk query
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navOptions = (
    <>
      <li className="">
        <NavLink to="/">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1 ">
              {/* {isActive ? <IoHome /> : <IoHomeOutline />} */ <p>home</p>}
            </div>
          )}
        </NavLink>
      </li>
      <li className="active:bg-transparent">
        <NavLink to={"/all-products"}>
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1">
              {/* {isActive ? <AiFillProduct /> : <AiOutlineProduct />} */}
              <p>shop</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1">
              {/* {isActive ? <RiContactsBookFill /> : <RiContactsBook3Line />}{" "} */}
              <p>Contact</p>
            </div>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1">
              {/* {isActive ? <BiSolidInfoSquare /> : <BiInfoSquare />}  */}
              <p>About</p>
            </div>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar p-0 bg-base-100 text-black justify-between max-w-screen-xl mx-auto">
      <section className="hidden md:inline-flex">
        {/* logo section  */}
        <section className="flex">
          <Link>
            <img
              width={100}
              src={logo}
              alt="PurchezTech Logo"
              className="h-9 w-9"
            />
          </Link>
          <Link
            to={"/"}
            className="-mx-2 mt-[.6rem] text-xl font-josefin_sans font-extrabold"
          >
            <span className="">urch</span>
            {/* <span className="text-xl font-sankofa px-1 inline-block transform translate-y-[-2px] bg-textC text-white mt-2 font-normal">
              EZ
            </span> */}
            EZ
            {/* the TECH part  */}
            <span>Tech</span>
          </Link>
        </section>
      </section>

      {/* center of navbar  */}
      <section className="w-full md:flex-1 px-6 md:px-0 box-border">
        {/* search box  */}
        <div
          className={`flex rounded-none items-center justify-center relative md:ml-6 w-full`}
        >
          <input
            type="text"
            name="search-box"
            className={
              "input rounded-none focus:outline-none w-full h-10 border-black focus:border-on-hover"
            }
            placeholder="Search for your desired Products"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {search && (
            <RxCross2
              className="absolute right-14 cursor-pointer text-primary-color"
              onClick={() => setSearch("")}
            />
          )}
          <button className="px-3 bg-black border-black hover:border-on-hover  hover:bg-on-hover rounded-none min-h-10 h-10">
            <IoSearchSharp className="text-base text-white" />
          </button>
        </div>
      </section>

      {/* nav end  */}
      <section className="hidden md:inline-flex">
        {/* menu items */}
        <nav className="uppercase mx-4 hidden md:inline-flex text-[#363634] ">
          {navOptions}
        </nav>

        <div className="flex space-x-7 items-center">
          {/* cart icon  */}
          <Link to="/cart" className="relative group hover:text-on-hover">
            <HiOutlineShoppingCart className={`text-xl cursor-pointer`} />
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white w-4 h-4 rounded-full font-extrabold group-hover:bg-on-hover group-hover:text-white text-center ">
              0
            </span>
          </Link>

          {/* login button */}
          {!isAuthenticated ? (
            <Link to="/auth/login" state={{ from: location.pathname }}>
              <Button className="bg-transparent border-black text-accent-color hover:bg-on-hover hover:text-white">
                Login
              </Button>
            </Link>
          ) : (
            <Avatar />
          )}
        </div>
      </section>
    </div>
  );
};

export default Navbar;
