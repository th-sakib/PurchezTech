import { useCallback, useEffect, useState } from "react";
import { TbArrowsSort } from "react-icons/tb";
import FilterOptions from "../FilterOptions/FilterOptions";
import ProductCard from "../../../Components/ProductCard";
import { useGetAllProductQuery } from "../../../redux/api/apiSlice";
import NoProduct from "../../../Components/NoProduct";
import { useSelector } from "react-redux";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

const AllProducts = () => {
  const selectedCategory = useSelector((state) => state.category.category);
  const [brand, setBrand] = useState("");
  const [sortOption, setSortOption] = useState("");

  // price range states
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  // Track the last known initial price range to detect category changes
  const [lastInitialPriceRange, setLastInitialPriceRange] = useState(null);

  //search term
  const search = useSelector((state) => state.search.term);

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
    data: productInfo,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetAllProductQuery({
    category: selectedCategory,
    brand,
    sortByPrice,
    sortByDate,
    search,
    minPrice,
    maxPrice,
    page,
    limit,
  });

  const productData = productInfo?.data?.listOfProduct; // product data from server
  const initialPriceRange = productInfo?.data?.priceRange; // price range from server

  useEffect(() => {
    // Detect if the `initialPriceRange` has changed
    if (
      initialPriceRange &&
      (lastInitialPriceRange?.initialMinPrice !==
        initialPriceRange.initialMinPrice ||
        lastInitialPriceRange?.initialMaxPrice !==
          initialPriceRange.initialMaxPrice)
    ) {
      setMinPrice(initialPriceRange.initialMinPrice || 0);
      setMaxPrice(initialPriceRange.initialMaxPrice || 1000);
      setLastInitialPriceRange(initialPriceRange); // Update the tracker
    }
  }, [initialPriceRange, lastInitialPriceRange]);

  // handlers
  const handleMinPriceChange = (value) => {
    setMinPrice(Math.min(value, maxPrice - 1)); // Ensure minPrice is less than maxPrice
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(Math.max(value, minPrice + 1)); // Ensure maxPrice is greater than minPrice
  };

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < productInfo?.data?.totalPages) {
      setPage(page + 1);
    }
  };

  if (isUninitialized) {
    return <p>Waiting to fetch data...</p>;
  }
  return (
    <>
      {/* meta tag start  */}
      <meta
        name="description"
        content="Buy the latest tech gadgets and e-commerce deals. Shop with ease and enjoy top-notch customer support with purcheztech!"
      />
      <link
        rel="canonical"
        href="https://purcheztech.onrender.com/all-products"
      />
      <title>All Products | PurchezTech</title>
      {/* meta tag end  */}

      <div className="font-secondaryFont max-w-[82%] bannerMd:max-w-[78%] lg:max-w-[82%] xl:max-w-[1200px] xxl:max-w-[1350px] mx-auto py-4 bg-background-color flex lg:gap-6">
        {/* filter section  */}
        <section className="hidden lg:block w-44">
          <FilterOptions
            setBrand={setBrand}
            brand={brand}
            initialPriceRange={initialPriceRange}
            setMaxPrice={handleMaxPriceChange}
            setMinPrice={handleMinPriceChange}
            isLoading={isLoading}
            isFetching={isFetching}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setPage={setPage}
          />
        </section>

        {/* drawer button */}
        <div className="drawer-content z-50 lg:hidden">
          <label
            htmlFor="my-drawer1"
            className="drawer-button btn bg-accent-color border-accent-color fixed bottom-16 md:bottom-3 right-3 hover:bg-on-hover rounded-sm"
          >
            {/* button  */}
            <p className="text-base font-bold text-white">Filter</p>
          </label>
        </div>

        {/* mid device - the sidebar */}
        <section className="block lg:hidden">
          <div className="drawer drawer-end">
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
                <FilterOptions
                  setBrand={setBrand}
                  brand={brand}
                  initialPriceRange={initialPriceRange}
                  setMaxPrice={handleMaxPriceChange}
                  setMinPrice={handleMinPriceChange}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setPage={setPage}
                />
              </ul>
            </div>
          </div>
        </section>

        {/* product view section  */}
        <section className="drawer-content">
          {/* title section */}
          <div className={`flex justify-between items-center pb-2 font-bold`}>
            <h3 className="capitalize">
              {selectedCategory
                ? selectedCategory === "default"
                  ? "All Products"
                  : selectedCategory
                : "All Products"}
            </h3>

            {/* sort by option  */}
            <div
              className={`flex gap-1 items-center font-bold ${
                productData?.length === 0 ? "invisible" : "block"
              }`}
            >
              <TbArrowsSort />
              Sort By:
              <select
                className="h-8 rounded-sm bg-transparent border border-additional-color cursor-pointer capitalize"
                name="sortBy"
                onChange={(e) => {
                  setPage(1);
                  setSortOption(e.target.value);
                }}
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
          <div className="flex flex-wrap justify-start mb-3">
            {/* if loading or fetching  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-start items-start gap-5">
              {isLoading || isFetching
                ? Array(8)
                    .fill()
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="card bg-base-100 shadow-xl w-[82vw] orderSm:w-[40vw] md:w-[25.5vw] lg:w-[20vw] xl:w-[17.5vw] gap-3 rounded-sm rounded-b-lg mb-3"
                      >
                        {/* skeleton  */}
                        <div className="card bg-white shadow-lg animate-pulse rounded-none border rounded-b-lg overflow-hidden group/parent relative">
                          <div className="absolute -top-2 -right-2 cursor-pointer">
                            <div className="bg-accent-color w-12 h-12 text-white rounded-bl-full flex justify-center items-center absolute top-0 right-0 z-20 isolate group/inner"></div>
                            <div className="absolute top-3 -right-5 flex z-10 transform isolate group-hover/parent:-translate-x-16"></div>
                          </div>
                          <figure className="h-36 bg-gray-200 md:h-44 animate-pulse xl:h-44">
                            <div className="h-40 rounded"></div>
                          </figure>
                          <div className="flex flex-row p-2 h-20 relative">
                            <div className="overflow-hidden flex flex-col justify-around w-4/5 animate-pulse">
                              <div className="h-4 bg-gray-200 rounded w-full"></div>
                              <div className="h-4 bg-gray-200 rounded w-full"></div>
                            </div>
                            <div className="text-right self-center absolute right-2 bottom-0 font-bold text-accent-color animate-pulse"></div>
                            <div className="text-right self-center absolute right-2 animate-pulse">
                              <div className="text-xl font-bold relative w-fit">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full h-11 bg-accent-color hover:bg-on-hover text-white border-none group rounded-b-md uppercase">
                            <div className="w-full bg-accent-color hover:bg-on-hover text-white border-none group rounded-b-md uppercase"></div>
                          </div>
                        </div>
                      </div>
                    ))
                : ""}
            </div>

            {/* product view section  */}
            {productData?.length === 0 ? (
              <div className="flex justify-center items-center w-[80vw] h-[70vh]">
                <NoProduct />
              </div>
            ) : (
              // ======= product card section =======
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-5 justify-center items-center">
                {productData?.map((product) => (
                  <div key={product._id}>
                    <ProductCard isLoading={isLoading} product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* pagination div */}
          {productInfo?.data?.totalProducts > 12 ? (
            <div className="w-full flex justify-center items-center mb-3">
              {/* pagination */}
              <section className="join rounded-sm flex justify-center items-center">
                {/* prev button  */}
                <button
                  className={`px-2 font-bold  border border-accent-color hover:bg-[#6daef405]/50 shadow-md w-full h-full flex justify-center items-center py-1`}
                  onClick={() => handlePrev()}
                >
                  <HiArrowSmLeft />
                </button>
                {productInfo?.data?.totalProducts > 12 &&
                  Array.from(
                    { length: productInfo?.data?.totalPages },
                    (_, idx) => idx + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`px-2 font-bold rounded-sm  border border-accent-color shadow-md ${
                        page === pageNumber
                          ? "bg-accent-color text-white"
                          : "bg-white hover:bg-[#6daef405]/50"
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                {/* next button  */}
                <button
                  className={`px-2 font-bold  border border-accent-color hover:bg-[#6daef405]/50 shadow-md w-full h-full flex justify-center items-center py-1`}
                  onClick={() => handleNext()}
                >
                  <HiArrowSmRight />
                </button>
              </section>
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </>
  );
};

export default AllProducts;
