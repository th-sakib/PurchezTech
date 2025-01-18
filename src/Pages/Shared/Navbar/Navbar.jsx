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
import {
  useFetchCartQuery,
  useFetchWishlistQuery,
} from "../../../redux/api/apiSlice.js";

const Navbar = () => {
  const [localSearch, setLocalSearch] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // rtk / rtk query
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  // apiSlice endpoint for fetchingCart
  const {
    data: cartInfo,
    isLoading: cartLoading,
    isFetching: cartFetching,
  } = useFetchCartQuery({ userId: userInfo?._id });

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
      <li className="hover:text-black text-[#000000c3]">
        <NavLink to="/">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1">
              {/* {isActive ? <IoHome /> : <IoHomeOutline />} */ <p>home</p>}
            </div>
          )}
        </NavLink>
      </li>
      <li className="active:bg-transparent hover:text-black text-[#000000c3]">
        <NavLink to={"/all-products"}>
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1">
              {/* {isActive ? <AiFillProduct /> : <AiOutlineProduct />} */}
              <p>shop</p>
            </div>
          )}
        </NavLink>
      </li>
      <li className="hover:text-black text-[#000000c3]">
        <NavLink to="/contact">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1">
              {/* {isActive ? <RiContactsBookFill /> : <RiContactsBook3Line />}{" "} */}
              <p>Contact</p>
            </div>
          )}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex py-2 bg-white text-black justify-between max-w-[90vw] xl:max-w-[1080px] mx-auto items-center">
      {/* navbar start  */}
      <section className="hidden md:flex min-w-[15rem]">
        {/* logo section  */}
        <section className="flex">
          <Link>
            <img
              src={logo}
              alt="PurchezTech Logo"
              className="h-auto w-9 aspect-square"
            />
          </Link>
          <Link
            to={"/"}
            className="-mx-4 logoMd:-mx-2 mt-[.7rem] logoMd:mt-[.6rem] text-xl font-josefin_sans font-extrabold"
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
      <section className="flex-grow mx-auto justify-center items-center flex mt-1 w-full transition-all duration-300 ml-[10%]">
        {/* menu items */}
        <nav className="uppercase hidden md:inline-flex text-sm font-bold md:mr-0 lg:mr-2 md:space-x-3">
          {navOptions}
        </nav>
      </section>

      {/* nav end  */}
      <section className={`md:flex gap-2 w-full`}>
        {/* search box  */}
        <div
          className={`flex rounded-none items-center justify-end relative ml-auto w-[90vw] md:w-auto ${
            !searchEnabled ? "w-[80%]" : ""
          }`}
        >
          <input
            type="text"
            name="search-box"
            className={`input rounded-none focus:outline-none h-10 border-black focus:border-on-hover transition-all duration-300 ${
              searchEnabled ? "w-full md:w-0 md:border-none " : "w-full "
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
            className={`px-3 
           rounded-none min-h-10 h-10 hover:border-additional-color group/search ${
             !searchEnabled
               ? "bg-black mr-0"
               : "bg-black md:bg-white text-white md:text-black -mr-2"
           }`}
            onClick={handleSearch}
          >
            <IoSearchSharp
              className={`group-hover/search:text-additional-color ${
                !searchEnabled
                  ? "text-white text-base"
                  : "lg:text-black lg:text-xl text-base md:text-xl"
              }`}
            />
          </button>
        </div>

        {/* cart and login button  */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* cart icon  */}
          <Link to="/cart" className="relative group hover:text-on-hover">
            <HiOutlineShoppingCart className={`text-xl cursor-pointer`} />
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white w-4 h-4 rounded-full font-extrabold group-hover:bg-on-hover group-hover:text-white text-center ">
              {cartInfo?.data?.items?.length || "0"}
            </span>
          </Link>

          {/* login button */}
          {!isAuthenticated ? (
            <Link to="/auth/login" state={{ from: location.pathname }}>
              <Button className="ml-4 bg-transparent border-black text-accent-color hover:bg-on-hover hover:text-white">
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
