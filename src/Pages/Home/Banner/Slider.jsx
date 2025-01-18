import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import cashback from "../../../assets/images/sliders/cashback.jpeg";
import delivery from "../../../assets/images/sliders/delivery.jpeg";
import droneDiscount from "../../../assets/images/sliders/droneDiscount.jpeg";

gsap.registerPlugin(useGSAP);

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const slideImages = [
    { id: 1, image: cashback },
    { id: 3, image: droneDiscount },
    { id: 2, image: delivery },
  ];

  const sliderRef = useRef();

  useGSAP(() => {
    slideImages.forEach((_, idx) => {
      const isActive = currentSlide === idx;
      gsap.to(`.slide-${idx}`, {
        width: isActive ? "100%" : "20%",
        duration: 1.5,
        ease: "elastic(0.8, .4)",
      });
    });
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={sliderRef}>
      {/* main section  */}
      <section className="flex overflow-hidden h-[60vh] md:h-[80vh] w-[90vw] md:w-[62vw] lg:w-auto select-none relative">
        {slideImages?.map((item, index) => (
          <div
            key={item.id}
            className={`slide-${index} relative h-auto rounded-[30px] m-2 lg:m-1`}
            onClick={() => setCurrentSlide(index)}
          >
            <img
              src={item.image}
              alt="banner image"
              className="block w-full h-full object-cover rounded-[30px]"
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Slider;
