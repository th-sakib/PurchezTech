import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { techProductWithBrands } from "../../../constant";

const FilterOptions = ({
  setSelectedCategory,
  setBrand,
  brand: brandState,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [rangeValue, setRangeValue] = useState([0]);

  const categories = Object.keys(techProductWithBrands);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleCategory = (currentCategory) => {
    const brands = techProductWithBrands[currentCategory] || [];
    setSelectedBrands(brands);
    setSelectedCategory(currentCategory);
    setBrand("");
  };

  const handleRangeChange = (e) => {
    setRangeValue();
    console.log(e);
  };

  return (
    <div className="overflow-hidden">
      {/* filter with price  */}
      <section className="my-2">
        <p className="text-lg font-bold capitalize">price range: </p>

        <input
          type="range"
          min={0}
          max="100"
          onChange={() => handleRangeChange()}
          className="range range-success"
        />
      </section>

      {/* Category list */}
      <section className="">
        {/* the drop down button  */}
        <div
          className="bg-accent-color text-white flex items-center px-5 py-2 rounded-[3px] cursor-pointer select-none"
          onClick={toggleCategory}
        >
          <GiHamburgerMenu className="text-xl" />
          <h2 className="text-lg font-bold ml-2 flex-1 w-28">Category</h2>
          {!isCategoryOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>

        {/* view categories  */}
        <ul
          className={`flex  flex-col transition-all overflow-auto overflow-x-hidden no-scrollbar duration-300 ease-in-out ${
            isCategoryOpen ? "max-h-[50vh]" : "max-h-0"
          }`}
        >
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

      {/* price section  */}
      <section></section>
    </div>
  );
};

export default FilterOptions;
