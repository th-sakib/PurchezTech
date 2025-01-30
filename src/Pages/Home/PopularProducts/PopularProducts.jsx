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
    <div className={(cn("relative my-5 lg:px-0"), className)}>
      <h1 className="inline-block border-l-8 border-l-additional-color bg-gradient-to-r from-additional-color/10 via-10% to-background-color to-100% pl-3 font-secondaryFont text-xl font-bold capitalize">
        Popular Products
      </h1>
      <section className="mt-3 grid grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading || isFetching
          ? Array(4)
              .fill()
              .map((_, idx) => (
                <div
                  key={idx}
                  className="card mt-4 gap-3 rounded-sm rounded-b-lg bg-base-100 shadow-xl"
                >
                  <div className="skeleton h-44 w-full rounded-none"></div>
                  <div className="overflow-hidden px-2">
                    <div className="float-left w-[70%] overflow-hidden">
                      <div className="skeleton mb-2 h-4 w-28 rounded-none"></div>
                      <div className="skeleton h-4 w-full rounded-none"></div>
                    </div>
                    <div className="float-left w-[30%]">
                      <div className="skeleton mb-2 ml-2 h-4 w-4/5 rounded-none"></div>
                      <div className="skeleton ml-2 h-4 rounded-none"></div>
                    </div>
                  </div>

                  <div className="skeleton h-12 w-full rounded-none rounded-b-lg"></div>
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
