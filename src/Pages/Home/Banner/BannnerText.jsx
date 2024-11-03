import React from "react";
import Button from "../../../Components/Button";
import { Link } from "react-router-dom";

const BannnerText = () => {
  return (
    <div className="w-full text-center flex flex-col justify-center items-center text-primary-color">
      <h1 className="text-3xl md:text-5xl mb-5 lg:w-7/12">
        Shop Tech & Accessories with Ease at PurchezTech
      </h1>
      <p className="text-center mb-5 w-2/3 lg:w-2/6 text-sm">
        PurchezTech makes buying high-quality tech accessories easy, reliable,
        and convenient for work, gaming, and more.
      </p>

      <Link to="/all-products">
        <Button className="border-none w-36 text-white" shopNow>
          Shop now
        </Button>
      </Link>
    </div>
  );
};

export default BannnerText;
