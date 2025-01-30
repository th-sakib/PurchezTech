import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/Logo/main-logo-fn.png";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import Button from "../../../Components/Button";
import { useState } from "react";
import { selectIsAuthenticated } from "../../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { setSearchTerm } from "../../../redux/features/user/searchSlice.js";
import "./Navbar.css";

const Navbar = () => {
  const [localSearch, setLocalSearch] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // rtk / rtk query
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (localSearch !== "") {
      dispatch(setSearchTerm(localSearch));
      if (localSearch) navigate("/all-products");
    } else {
      setSearchEnabled(!searchEnabled);
    }
  };

  const handleSearchClear = () => {
    setLocalSearch("");
    dispatch(setSearchTerm(""));
  };

  const navOptions = (
    <>
      <li className="text-[#000000c3] hover:text-black">
        <NavLink to="/">
          {({ isActive }) => (
            <div className="flex items-center justify-center space-x-1 px-1">
              {/* {isActive ? <IoHome /> : <IoHomeOutline />} */ <p>home</p>}
            </div>
          )}
        </NavLink>
      </li>
      <li className="text-[#000000c3] hover:text-black active:bg-transparent">
        <NavLink to={"/all-products"}>
          {({ isActive }) => (
            <div className="flex items-center justify-center space-x-1 px-1">
              {/* {isActive ? <AiFillProduct /> : <AiOutlineProduct />} */}
              <p>shop</p>
            </div>
          )}
        </NavLink>
      </li>
      <li className="text-[#000000c3] hover:text-black">
        <NavLink to="/contact">
          {({ isActive }) => (
            <div className="flex items-center justify-center space-x-1 px-1">
              {/* {isActive ? <RiContactsBookFill /> : <RiContactsBook3Line />}{" "} */}
              <p>Contact</p>
            </div>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="mx-auto flex max-w-[90vw] items-center justify-between bg-white py-2 text-black lg:max-w-[95vw] xxl:max-w-[1450px]">
      {/* navbar start  */}
      <section className="hidden min-w-[15rem] md:flex">
        {/* logo section  */}
        <section className="flex">
          <Link>
            <img
              src={logo}
              alt="PurchezTech Logo"
              className="aspect-square h-auto w-9"
            />
          </Link>
          <Link
            to={"/"}
            className="-mx-4 mt-[.7rem] font-josefin_sans text-xl font-extrabold logoMd:-mx-2 logoMd:mt-[.6rem]"
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
      <section className="mx-auto ml-[10%yarn] mt-1 flex w-full flex-grow items-center justify-center">
        {/* menu items */}
        <nav className="hidden text-sm font-bold uppercase md:mr-0 md:inline-flex md:space-x-3 lg:mr-2">
          {navOptions}
        </nav>
      </section>

      {/* nav end  */}
      <section className={`shrink-0 gap-2 md:flex`}>
        {/* search box  */}
        <div
          className={`relative ml-auto flex w-[90vw] items-center justify-end rounded-none md:w-auto ${
            !searchEnabled ? "w-[80%]" : ""
          }`}
        >
          <input
            type="text"
            name="search-box"
            className={`input h-10 rounded-none border-black transition-all duration-300 focus:border-on-hover focus:outline-none ${
              searchEnabled ? "w-full md:w-0 md:border-none" : "w-full"
            }`}
            placeholder="Search for your desired Products"
            onChange={(e) => setLocalSearch(e.target.value)}
            value={localSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {localSearch && (
            // cross button
            <RxCross2
              className="absolute right-12 cursor-pointer text-primary-color"
              onClick={() => handleSearchClear()}
            />
          )}
          <button
            className={`group/search h-10 min-h-10 rounded-none px-3 hover:border-additional-color ${
              !searchEnabled
                ? "mr-0 bg-black"
                : "bg-black text-white md:-mr-2 md:bg-white md:text-black"
            }`}
            onClick={handleSearch}
          >
            <IoSearchSharp
              className={`group-hover/search:text-additional-color ${
                !searchEnabled
                  ? "text-base text-white"
                  : "text-base md:text-xl lg:text-xl lg:text-black"
              }`}
            />
          </button>
        </div>

        {/* cart and login button  */}
        <div className="hidden items-center space-x-4 md:flex">
          {/* cart icon  */}
          <Link to="/cart" className="group relative hover:text-on-hover">
            <HiOutlineShoppingCart className={`cursor-pointer text-xl`} />
          </Link>

          {/* login button */}
          {!isAuthenticated ? (
            <Link to="/auth/login" state={{ from: location.pathname }}>
              <Button className="border-black bg-transparent text-accent-color hover:bg-on-hover hover:text-white">
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
