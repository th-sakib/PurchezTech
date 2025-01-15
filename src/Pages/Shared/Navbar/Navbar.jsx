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
import { HiHeart } from "react-icons/hi2";

const Navbar = () => {
  const [localSearch, setLocalSearch] = useState("");
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

  const {
    data: wishlistInfo,
    isLoading: wishlistLoading,
    isFetching: wishlistFetching,
  } = useFetchWishlistQuery({ userId: userInfo?._id });

  const handleSearch = () => {
    dispatch(setSearchTerm(localSearch));
    if (localSearch) navigate("/all-products");
  };

  const handleSearchClear = () => {
    setLocalSearch("");
    dispatch(setSearchTerm(""));
  };

  const navOptions = (
    <>
      <li className="hover:text-[#000000bb]">
        <NavLink to="/">
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1">
              {/* {isActive ? <IoHome /> : <IoHomeOutline />} */ <p>home</p>}
            </div>
          )}
        </NavLink>
      </li>
      <li className="active:bg-transparent hover:text-[#000000bb]">
        <NavLink to={"/all-products"}>
          {({ isActive }) => (
            <div className="flex justify-center items-center space-x-1 px-1">
              {/* {isActive ? <AiFillProduct /> : <AiOutlineProduct />} */}
              <p>shop</p>
            </div>
          )}
        </NavLink>
      </li>
      <li className="hover:text-[#000000bb]">
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
    <div className="navbar p-0 bg-white text-black justify-center xl:max-w-[1080px] mx-auto items-center">
      {/* navbar start  */}
      <section className="hidden md:flex">
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
      <section className="w-full md:w-[45%] lg:w-2/4 xl:w-7/12 px-6 lg:px-0 box-border">
        {/* search box  */}
        <div
          className={`flex rounded-none items-center justify-center relative lg:ml-6 w-full`}
        >
          <input
            type="text"
            name="search-box"
            className={
              "input rounded-none focus:outline-none w-full h-10 border-black focus:border-on-hover"
            }
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
            <RxCross2
              className="absolute right-12 cursor-pointer text-primary-color"
              onClick={() => handleSearchClear()}
            />
          )}
          <button
            className="px-3 bg-black border-black
           rounded-none min-h-10 h-10 hover:border-additional-color group/search"
            onClick={handleSearch}
          >
            <IoSearchSharp className="text-base text-white group-hover/search:text-additional-color" />
          </button>
        </div>
      </section>

      {/* nav end  */}
      <section className="hidden md:inline-flex md:-ml-4 lg:ml-0">
        {/* menu items */}
        <nav className="uppercase lg:mx-2 xl:mx-4 hidden md:inline-flex text-[#00000088] font-secondaryFont font-extrabold text-sm">
          {navOptions}
        </nav>

        {/* cart and login button  */}
        <div className="flex lg:space-x-4 items-center">
          {/* cart icon  */}
          <Link to="/cart" className="relative group hover:text-on-hover">
            <HiOutlineShoppingCart className={`text-xl cursor-pointer`} />
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white w-4 h-4 rounded-full font-extrabold group-hover:bg-on-hover group-hover:text-white text-center ">
              {cartInfo?.data?.items?.length || "0"}
            </span>
          </Link>
          {/* wishlist icon */}
          <Link
            to="/wishlist"
            className="relative group hover:text-on-hover mx-2"
          >
            <HiHeart className={`text-xl cursor-pointer`} />
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white w-4 h-4 rounded-full font-extrabold group-hover:bg-on-hover group-hover:text-white text-center ">
              {wishlistInfo?.data?.list?.length || "0"}
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
