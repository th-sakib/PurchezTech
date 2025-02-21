import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { techProductWithBrands } from "../../../constant";
import { useDispatch } from "react-redux";
import { setCategory } from "../../../redux/features/user/filterCategorySlice";
import { setSearchTerm } from "../../../redux/features/user/searchSlice";

const FilterOptions = ({
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

  const dispatch = useDispatch();

  const categories = Object.keys(techProductWithBrands);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategory = (currentCategory) => {
    const brands = techProductWithBrands[currentCategory] || [];
    setSelectedBrands(brands);
    dispatch(setCategory(currentCategory));
    dispatch(setSearchTerm(""));
    setBrand("");
    setIsCategoryOpen(false);
    setPage(1);
  };

  return (
    <div className="overflow-hidden">
      {/* filter with price  */}
      <section className="mb-4">
        <p className="mb-2 text-lg font-bold capitalize">price range: </p>

        {/* text range price section  */}
        <div className="mb-3 flex items-center justify-center capitalize">
          <div className="mr-3 h-full w-full">
            <input
              className="ml-1 h-full w-full border border-accent-color py-1.5 text-center text-sm text-gray-700"
              type="number"
              name="min"
              autoComplete="off"
              min={initialPriceRange?.initialMinPrice}
              max={initialPriceRange?.initialMaxPrice}
              value={minPrice || 0}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>
          <span className="text-2xl">-</span>
          <div className="mx-2 h-full w-full">
            <input
              className="ml-1 h-full w-full border border-accent-color py-1.5 text-center text-sm text-gray-700"
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
        <div className="relative h-0.5 w-full rounded bg-[#ddd]">
          {/* the slider body range */}
          <div
            className="absolute left-0 right-0 h-0.5 rounded bg-additional-color/80"
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
            className={`pointer-events-none absolute -top-[5px] w-full appearance-none bg-transparent ${
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
            className="pointer-events-none absolute -top-[5px] w-full appearance-none bg-transparent"
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
          className="flex cursor-pointer select-none items-center rounded-[3px] bg-accent-color px-5 py-2 text-white"
          onClick={toggleCategory}
        >
          <GiHamburgerMenu className="text-xl" />
          <h2 className="mx-2 w-28 flex-1 text-base font-bold transition-all duration-300 xl:text-lg">
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
          className={`no-scrollbar flex flex-col overflow-auto overflow-x-hidden transition-all duration-300 ease-in-out ${
            isCategoryOpen ? "max-h-[50vh]" : "max-h-0"
          }`}
        >
          <li
            className="mb-0.5 cursor-pointer rounded-sm bg-white px-3 py-2 text-sm capitalize text-[#666] hover:text-additional-color"
            onClick={() => handleCategory("default")}
          >
            all
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className="mb-0.5 cursor-pointer rounded-sm bg-white px-3 py-2 text-sm capitalize text-[#666] hover:text-additional-color"
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
                className={`btn btn-outline h-7 min-h-0 rounded-full px-2 py-0 text-sm capitalize hover:bg-accent-color ${
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
