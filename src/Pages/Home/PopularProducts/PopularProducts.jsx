import React from "react";
import {
  useGetAllProductQuery,
  useGetPopularProductsQuery,
} from "../../../redux/api/apiSlice";
import ProductCard from "../../../Components/ProductCard";
import { cn } from "../../../lib/cn";

const PopularProducts = ({ className }) => {
  const {
    data: fetchData,
    isLoading,
    isFetching,
  } = useGetPopularProductsQuery();

  const popularProducts = fetchData?.data?.popularProducts;
  return (
    <div className={(cn("lg:px-0 my-5 relative"), className)}>
      <h1 className="text-xl font-bold border-l-8 border-l-additional-color font-secondaryFont pl-3 bg-gradient-to-r from-additional-color/10 via-10% to-background-color to-100% capitalize inline-block">
        Popular Products
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-center items-center mt-3">
        {isLoading || isFetching
          ? Array(4)
              .fill()
              .map((_, idx) => (
                <div
                  key={idx}
                  className="card bg-base-100 shadow-xl gap-3 rounded-sm rounded-b-lg mt-4"
                >
                  <div className="skeleton h-44 w-full rounded-none"></div>
                  <div className="px-2 overflow-hidden ">
                    <div className="w-[70%] float-left overflow-hidden">
                      <div className="skeleton h-4 w-28 mb-2 rounded-none"></div>
                      <div className="skeleton h-4 w-full rounded-none"></div>
                    </div>
                    <div className="w-[30%] float-left">
                      <div className="skeleton w-4/5 h-4 mb-2 rounded-none ml-2"></div>
                      <div className="skeleton h-4 rounded-none ml-2"></div>
                    </div>
                  </div>

                  <div className="skeleton h-12 rounded-none w-full rounded-b-lg"></div>
                </div>
              ))
          : popularProducts?.map((product) => (
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
