import React, { useRef } from "react";
import { cn } from "../../../lib/cn";
import { useDispatch } from "react-redux";

// swiper import
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../../../redux/features/user/filterCategorySlice";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

// category list
const categories = [
  {
    title: "Drones",
    imageURL: "https://i.ibb.co.com/6PkxWtH/drone.png",
  },
  {
    title: "Gaming Consoles",
    imageURL: "https://i.ibb.co.com/s6jjQh7/game-console.png",
  },
  {
    title: "Smartphones",
    imageURL: "https://i.ibb.co.com/8zb2JT8/iphone.png",
  },
  {
    title: "Laptops",
    imageURL: "https://i.ibb.co.com/x7NTqm9/laptop.png",
  },
  {
    title: "camera & photography",
    imageURL: "https://i.ibb.co.com/vDR4qJs/camera.png",
  },
  {
    title: "VR System",
    imageURL: "https://i.ibb.co.com/2vS9PHv/vr.png",
  },
  {
    title: "tablets",
    imageURL: "https://i.ibb.co.com/84x2wYQ/tablet-8683980.png",
  },
  {
    title: "monitors",
    imageURL: "https://i.ibb.co.com/8KDP5fS/computer-887108.png",
  },
];

const breakPoints = {
  340: {
    slidesPerView: 1.7,
  },
  400: {
    slidesPerView: 2,
    spaceBetween: 0,
    centeredSlides: false,
  },
  500: {
    slidesPerView: 2.7,
    spaceBetween: 0,
    centeredSlides: false,
  },
  570: {
    slidesPerView: 3,
    spaceBetween: 0,
    centeredSlides: false,
  },
  750: {
    slidesPerView: 3,
    spaceBetween: 0,
    centeredSlides: false,
  },
  770: {
    slidesPerView: 4,
    spaceBetween: 0,
    centeredSlides: false,
  },
  900: {
    slidesPerView: 4,
    spaceBetween: 0,
    centeredSlides: false,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 0,
    centeredSlides: false,
  },
  1170: {
    slidesPerView: 6,
    spaceBetween: 0,
    centeredSlides: false,
  },
};

const Categories = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const swiperRef = useRef(null);

  const handleCategory = (category) => {
    navigate("/all-products");
    const categoryTitle = category.title.toLowerCase();
    dispatch(setCategory(categoryTitle));
  };

  return (
    <div className={(cn("lg:px-0 my-5 relative"), className)}>
      {/* swiper buttons  */}
      <div className="flex items-center justify-between gap-2 my-2">
        <h1 className="text-xl font-bold border-l-8 border-l-additional-color font-secondaryFont pl-3 bg-gradient-to-r from-additional-color/10 to-background-color">
          Popular Categories:
        </h1>
        {/* left arrow - swiper */}
        <div className="flex gap-2">
          <button
            type="button"
            className="w-8 h-8 border hover:text-additional-color rounded-full bg-accent-color hover:bg-on-hover flex justify-center items-center text-white text-2xl"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FaCaretLeft className="-ml-1" />
          </button>
          {/* right arrow - swiper */}
          <button
            type="button"
            className="w-8 h-8 border hover:text-additional-color rounded-full bg-accent-color hover:bg-on-hover flex justify-center items-center text-white text-2xl"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FaCaretRight className="-mr-1" />
          </button>
        </div>
      </div>

      {/* slider start  */}
      <Swiper
        slidesPerView="1"
        spaceBetween="0"
        centeredSlides={true}
        breakpoints={breakPoints}
        resistanceRatio={0.5}
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        speed={500}
      >
        {categories.map((category) => (
          <SwiperSlide className="m-0 ml-2" key={category.title}>
            <div
              className="flex flex-col justify-center items-center border border-gray-500 w-40 h-40 gap-2 hover:border-accent-color cursor-pointer transition-all duration-300 group"
              onClick={() => handleCategory(category)}
            >
              <img
                className="h-20 w-auto group-hover:scale-110 duration-300 transition-all"
                src={category.imageURL}
                alt={category.title}
              />
              <p className="text-center">{category.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
