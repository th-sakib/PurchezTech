import { useState } from "react";
import { techProductWithBrands } from "../../../constant";
import { TbArrowsSort } from "react-icons/tb";
import FilterOptions from "../FilterOptions/FilterOptions";
import ProductCard from "../../../Components/ProductCard";
import { useGetProductQuery } from "../../../redux/api/apiSlice";

const AllProducts = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // fetching product to view
  const {
    data: productData,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetProductQuery();

  return (
    <div className="font-secondaryFont w-[98%] mx-auto py-4 bg-background-color flex gap-6">
      {/* filter section  */}
      <section className="">
        {/* the sidebar  */}
        <div className="drawer lg:drawer-open">
          <input id="my-drawer1" type="checkbox" className="drawer-toggle" />

          <div className="overflow-hidden h-auto drawer-side ">
            <label
              htmlFor="my-drawer"
              aria-label="sidebar"
              className="drawer-overlay"
            ></label>
            {/* TODO: check why this label thing exists and is it affecting the
            output */}
            <ul className="bg-transparent text-base-content min-h-full">
              {/* Sidebar content here */}
              <FilterOptions />
            </ul>
          </div>
        </div>
      </section>

      {/* product view section  */}
      <section className="">
        {/* title section */}
        <div className="flex justify-between items-center pb-2 font-bold">
          <h3>All Products</h3>
          {/* sort by option  */}
          <div className="flex gap-1 items-center font-bold">
            <TbArrowsSort />
            Sort By:
            <select
              className="h-8 rounded-sm bg-transparent border border-additional-color"
              name="sortBy"
              id=""
            >
              <option value="">A-Z</option>
              <option value="">a-z</option>
              <option value="">Sort by price</option>
              <option value="">A-Z</option>
              <option value="">A-Z</option>
            </select>
          </div>
        </div>

        {/* product view section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-center items-center">
          {productData?.data.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} isLoading={isLoading} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
