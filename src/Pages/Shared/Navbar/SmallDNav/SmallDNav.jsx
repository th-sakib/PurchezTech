import React from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { PiShoppingCartFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../../redux/features/user/userSlice";
import { isAction } from "@reduxjs/toolkit";

const SmallDNav = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <div className="h-12 bg-white border border-accent-color rounded-full flex items-center justify-around w-[90vw] px-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-accent-color" : "text-black"
        }
      >
        <FaHome className="h-5 w-5" />
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          isActive ? "text-accent-color" : "text-black"
        }
      >
        <HiHeart className="h-5 w-5" />
      </NavLink>
      <NavLink
        to="/all-products"
        className={({ isActive }) =>
          isActive ? "text-accent-color" : "text-black"
        }
      >
        <RiShoppingBag3Fill className="h-5 w-5" />
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "text-accent-color" : "text-black"
        }
      >
        <PiShoppingCartFill className="h-5 w-5" />
      </NavLink>
      <NavLink
        to={`${isAuthenticated ? "/profile-options" : "/auth/login"}`}
        className={({ isActive }) =>
          isActive ? "text-accent-color" : "text-black"
        }
      >
        <FaUserCircle className="h-5 w-5" />
      </NavLink>
    </div>
  );
};

export default SmallDNav;
