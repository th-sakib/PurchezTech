import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { techProductWithBrands } from "../../../constant";

const FilterOptions = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleBrand = () => {
    setIsBrandOpen(!isBrandOpen);
  };

  const handleCategory = (currentCategory) => {
    const brand = techProductWithBrands[currentCategory] || [];
    setSelectedBrands(brand);
  };

  const categories = Object.keys(techProductWithBrands);
  console.log(selectedBrands);

  return (
    <div className="overflow-hidden">
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
      <section className="my-2">
        {/* the drop down button  */}
        <div
          className="bg-accent-color text-white flex items-center px-5 py-2 rounded-[3px] cursor-pointer select-none"
          onClick={toggleBrand}
        >
          <GiHamburgerMenu className="text-xl" />
          <h2 className="text-lg font-bold ml-2 flex-1 w-28">Brand</h2>
          {!isCategoryOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>

        {/* view brands  */}
        <ul
          className={`flex  flex-col transition-all overflow-auto overflow-x-hidden no-scrollbar duration-300 ease-in-out ${
            isBrandOpen ? "max-h-[50vh]" : "max-h-0"
          }`}
        >
          {categories.map((category) => (
            <li
              key={category}
              className="px-3 bg-white rounded-sm py-2 hover:text-additional-color cursor-pointer text-sm text-[#666] mb-0.5 capitalize"
            >
              {category}
            </li>
          ))}
        </ul>
      </section>

      {/* price section  */}
      <section></section>
    </div>
  );
};

export default FilterOptions;
