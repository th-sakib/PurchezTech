import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { techProductWithBrands } from "../../../constant";

const FilterOptions = ({
  setSelectedCategory,
  setBrand,
  brand: brandState,
  initialPriceRange,
  setMaxPrice,
  setMinPrice,
  isFetching,
  isLoading,
  maxPrice,
  minPrice,
  setPage,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // for the arrow toggle
  const [selectedBrands, setSelectedBrands] = useState([]); // for selecting all brands in one category

  const categories = Object.keys(techProductWithBrands);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategory = (currentCategory) => {
    const brands = techProductWithBrands[currentCategory] || [];
    setSelectedBrands(brands);
    setSelectedCategory(currentCategory);
    setBrand("");
    setIsCategoryOpen(false);
    setPage(1);
  };

  return (
    <div className="overflow-hidden">
      {/* filter with price  */}
      <section className="mb-4 ">
        <p className="text-lg font-bold capitalize mb-2">price range: </p>

        {/* text range price section  */}
        <div className="capitalize flex justify-center items-center mb-3">
          <div className="w-full h-full">
            <input
              className="w-full h-full ml-1 text-center text-sm text-gray-700 py-1.5 border border-accent-color"
              type="number"
              name="min"
              autoComplete="off"
              min={initialPriceRange?.initialMinPrice}
              max={initialPriceRange?.initialMaxPrice}
              value={minPrice || 0}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>
          <span className="mx-2 text-2xl">-</span>
          <div className="w-full h-full mr-2">
            <input
              className="w-full h-full ml-1 text-center text-sm text-gray-700 py-1.5 border border-accent-color"
              type="number"
              name="max"
              autoComplete="off"
              min={initialPriceRange?.initialMinPrice}
              max={initialPriceRange?.initialMaxPrice}
              value={maxPrice || 0}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* price range progress bar  */}
        <div className="h-0.5 bg-[#ddd] rounded w-full relative">
          {/* the slider body range */}
          <div
            className="absolute h-0.5 left-1/4 right-1/4 rounded bg-additional-color/80"
            style={{
              left: `${
                ((minPrice - initialPriceRange?.initialMinPrice) /
                  (initialPriceRange?.initialMaxPrice -
                    initialPriceRange?.initialMinPrice)) *
                100
              }%`,
              right: `${
                ((initialPriceRange?.initialMaxPrice - maxPrice) /
                  (initialPriceRange?.initialMaxPrice -
                    initialPriceRange?.initialMinPrice)) *
                100
              }%`,
            }}
          ></div>
          {/* min range thumb */}
          <input
            className={`absolute w-full bg-transparent pointer-events-none -top-[5px] appearance-none ${
              isLoading || isFetching ? "cursor-wait" : "cursor-auto"
            }`}
            type="range"
            name="minRange"
            min={initialPriceRange?.initialMinPrice}
            max={initialPriceRange?.initialMaxPrice}
            value={minPrice || 0}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          {/* max range thumb */}
          <input
            className="absolute w-full bg-transparent pointer-events-none -top-[5px] appearance-none"
            type="range"
            name="maxRange"
            min={initialPriceRange?.initialMinPrice}
            max={initialPriceRange?.initialMaxPrice}
            value={maxPrice || 0}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </section>

      {/* Category list */}
      <section className="">
        {/* the drop down button  */}
        <div
          className="bg-accent-color text-white flex items-center px-5 py-2 rounded-[3px] cursor-pointer select-none"
          onClick={toggleCategory}
        >
          <GiHamburgerMenu className="text-xl" />
          <h2 className="text-lg font-bold ml-2 flex-1 w-28 transition-all duration-300">
            Category
          </h2>
          {!isCategoryOpen ? (
            <IoIosArrowDown className="rotate-360 transition-all duration-300" />
          ) : (
            <IoIosArrowDown className="rotate-180 transition-all duration-300" />
          )}
        </div>

        {/* view categories  */}
        <ul
          className={`flex  flex-col transition-all overflow-auto overflow-x-hidden no-scrollbar duration-300 ease-in-out ${
            isCategoryOpen ? "max-h-[50vh]" : "max-h-0"
          }`}
        >
          <li
            className="px-3 bg-white rounded-sm py-2 hover:text-additional-color cursor-pointer text-sm text-[#666] mb-0.5 capitalize"
            onClick={() => handleCategory("default")}
          >
            all
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className="px-3 bg-white rounded-sm py-2 hover:text-additional-color cursor-pointer text-sm text-[#666] mb-0.5 capitalize"
              onClick={() => handleCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </section>

      {/* brand list  */}
      <section>
        {/* title */}
        <p className="my-2 text-base font-bold">Filter Brands :</p>

        {/* brand tags  */}
        <div className="flex flex-wrap gap-2">
          {selectedBrands.length > 0 ? (
            selectedBrands.map((brand) => (
              <div
                key={brand}
                className={`capitalize text-sm rounded-full btn btn-outline py-0 px-2 min-h-0 h-7 hover:bg-accent-color ${
                  brandState === brand
                    ? "bg-accent-color text-white"
                    : "bg-transparent"
                }`}
                onClick={() => setBrand(brand)}
              >
                <div>{brand}</div>
              </div>
            ))
          ) : (
            <p className="text-sm">Select a category to view brands</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default FilterOptions;
