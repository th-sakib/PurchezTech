import React from "react";
import Button from "../../../Components/Button";

const BannnerText = () => {
  return (
    <div className="w-full text-center flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-5 w-2/4">
        Easy Buy Tech & Accessories with PurchezTech
      </h1>
      <p className="text-center mb-5 w-2/6 text-sm">
        PurchezTech makes buying high-quality tech accessories easy, reliable,
        and convenient for work, gaming, and more.
      </p>

      <Button shopNow>Shop now</Button>
    </div>
  );
};

export default BannnerText;
