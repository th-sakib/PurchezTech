import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";

// swiper import
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

// category list
const categories = [
  {
    title: "AirPods",
    imageURL: "https://i.ibb.co.com/d2k30Tk/airpods-icon.png",
  },
  {
    title: "Mobile Accessories",
    imageURL: "https://i.ibb.co.com/q7KRDV2/charger.png",
  },
  {
    title: "Drones",
    imageURL: "https://i.ibb.co.com/6PkxWtH/drone.png",
  },
  {
    title: "Gaming Consoles",
    imageURL: "https://i.ibb.co.com/s6jjQh7/game-console.png",
  },
  {
    title: "Headphones",
    imageURL: "https://i.ibb.co.com/nMwFWPT/headphones.png",
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
    title: "PC Components",
    imageURL: "https://i.ibb.co.com/Lz31tR4/processor.png",
  },
  {
    title: "Camera",
    imageURL: "https://i.ibb.co.com/vDR4qJs/camera.png",
  },
  {
    title: "Smartwatch",
    imageURL: "https://i.ibb.co.com/FVkCVGf/smartwatch.png",
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
    slidesPerView: 4,
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
  return (
    <div
      className={(cn("px-4 lg:px-0 max-w-screen-xl mx-auto my-5"), className)}
    >
      <Swiper
        slidesPerView="1"
        spaceBetween="0"
        centeredSlides={true}
        breakpoints={breakPoints}
        resistanceRatio={0.5}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide className="!m-0" key={category.title}>
            <Link
              // to={category.title} //TODO: change the path
              className="flex flex-col justify-center items-center border border-gray-500 w-40 h-40"
            >
              <img
                className="h-20"
                src={category.imageURL}
                alt={category.title}
              />
              <p className="text-center">{category.title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
