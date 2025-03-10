import React from "react";
import Button from "../../../Components/Button";
import { Link } from "react-router-dom";

const BannerText = () => {
  return (
    <div className="flex flex-col justify-center items-center lg:items-start gap-3 lg:gap-5 text-center lg:text-start mt-11 lg:mt-0">
      {/* header part  */}
      <div className="self-center space-y-2 lg:space-y-3">
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold leading-7">
          Shop Tech <span className="">&</span>{" "}
          <br className="hidden lg:inline " />{" "}
          <span className="text-accent-color">Accessories</span> with Ease
          <br className="hidden lg:inline " />
          at PurchezTech
        </h1>
        <p className="text-balance">
          PurchezTech makes buying high-quality tech accessories easy, reliable,
          and convenient for work, gaming, and more.
        </p>
      </div>

      <Link to="/all-products">
        <Button className="border-none font-bold text-base text-white" shopNow>
          Shop Now
        </Button>
      </Link>
    </div>
  );
};

export default BannerText;
