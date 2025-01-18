import React from "react";
import {
  useGetAllProductQuery,
  useGetPopularProductsQuery,
} from "../../../redux/api/apiSlice";
import ProductCard from "../../../Components/ProductCard";
import { cn } from "../../../lib/cn";

const PopularProducts = ({ className }) => {
  const { data: fetchData } = useGetPopularProductsQuery();

  const popularProducts = fetchData?.data?.popularProducts;
  return (
    <div className={(cn("lg:px-0 my-5 relative"), className)}>
      <h1 className="text-xl font-bold border-l-8 border-l-additional-color font-secondaryFont pl-3 bg-gradient-to-r from-additional-color/10 via-10% to-background-color to-100% capitalize inline-block">
        Popular Products
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center items-center mt-3">
        {popularProducts?.map((product) => (
          <ProductCard
            key={product?._id}
            product={product?.productDetails}
            totalSold={product?.totalProduct}
            productId={product?._id}
          />
        ))}
      </section>
    </div>
  );
};

export default PopularProducts;
