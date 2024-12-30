import React from "react";
import { useGetAllProductQuery } from "../../../redux/api/apiSlice";
import ProductCard from "../../../Components/ProductCard";
import { cn } from "../../../lib/cn";

const NewlyArrivals = ({ className }) => {
  const { data: productInfo } = useGetAllProductQuery({
    category: "default",
    sortByDate: "desc",
  });

  const newProducts = productInfo?.data?.listOfProduct.slice(0, 4);

  return (
    <div className={(cn("lg:px-0 my-5 relative"), className)}>
      <h1 className="text-xl font-bold border-l-8 border-l-additional-color font-secondaryFont pl-3 bg-gradient-to-r from-additional-color/10 via-10% to-background-color to-100% capitalize inline-block">
        new arrivals
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center items-center mt-3">
        {newProducts?.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default NewlyArrivals;
