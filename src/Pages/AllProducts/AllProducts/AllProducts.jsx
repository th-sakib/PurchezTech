import { useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import FilterOptions from "../FilterOptions/FilterOptions";
import ProductCard from "../../../Components/ProductCard";
import { useGetProductQuery } from "../../../redux/api/apiSlice";
import NoProduct from "../../../Components/NoProduct";

const AllProducts = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sortOption, setSortOption] = useState("");

  const sortByPrice =
    sortOption === "asc" || sortOption === "desc" ? sortOption : "";
  const sortByDate =
    sortOption === "newProducts"
      ? "desc"
      : sortOption === "oldProducts"
      ? "asc"
      : "";

  // fetching product to view
  const {
    data: productData,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetProductQuery({
    category: selectedCategory,
    brand,
    sortByPrice,
    sortByDate,
  });

  if (isUninitialized) {
    return <p>Waiting to fetch data...</p>;
  }

  return (
    <div className="font-secondaryFont w-[98%] mx-auto py-4 bg-background-color flex gap-6">
      {/* filter section  */}
      <section className="hidden lg:block w-[14%]">
        <FilterOptions
          setSelectedCategory={setSelectedCategory}
          setBrand={setBrand}
          brand={brand}
        />
      </section>

      {/* drawer button */}
      <div className="drawer-content z-50 lg:hidden">
        <label
          htmlFor="my-drawer1"
          className="drawer-button btn btn-outline fixed bottom-2 right-2"
        >
          {/* button  */}
          open
        </label>
      </div>

      {/* the sidebar for mid devices */}
      <section className="block lg:hidden">
        <div className="drawer">
          <input
            id="my-drawer1"
            type="checkbox"
            className="drawer-toggle z-50"
          />

          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer1"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <FilterOptions />
            </ul>
          </div>
        </div>
      </section>

      {/* product view section  */}
      <section className="drawer-content">
        {/* title section */}
        <div className={`flex justify-between items-center pb-2 font-bold`}>
          <h3 className="capitalize">{selectedCategory || "All Products"}</h3>

          {/* sort by option  */}
          <div
            className={`flex gap-1 items-center font-bold ${
              productData?.data.length === 0 ? "invisible" : "block"
            }`}
          >
            <TbArrowsSort />
            Sort By:
            <select
              className="h-8 rounded-sm bg-transparent border border-additional-color cursor-pointer capitalize"
              name="sortBy"
              onChange={(e) => setSortOption(e.target.value)}
              id="sortBy"
            >
              <option className="cursor-pointer">default</option>
              <option value="asc" className="cursor-pointer">
                Price - Ascending
              </option>
              <option value="desc" className="cursor-pointer">
                Price - Descending
              </option>
              <option value="newProducts" className="cursor-pointer">
                Date - New Products
              </option>
              <option value="oldProducts" className="cursor-pointer">
                Date - Old Products
              </option>
            </select>
          </div>
        </div>

        {/* product view section */}
        <div className="flex flex-wrap justify-center mb-3">
          {/* if loading or fetching  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-5">
            {isLoading || isFetching
              ? Array(8)
                  .fill()
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="card bg-base-100 shadow-xl w-[19.5vw] gap-3 rounded-sm rounded-b-lg mb-3"
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
              : ""}
          </div>

          {/* product view section  */}
          {productData?.data.length === 0 ? (
            <div className="flex justify-center items-center w-[80vw] h-[70vh]">
              <NoProduct />
            </div>
          ) : (
            // ======= product card section =======
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-center">
              {productData?.data.map((product) => (
                <div key={product._id}>
                  <ProductCard isLoading={isLoading} product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
{
  /** */
}
