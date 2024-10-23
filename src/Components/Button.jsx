import { FaLongArrowAltRight } from "react-icons/fa";

const Button = ({ children, shopNow, login }) => {
  return (
    <div
      className={`${
        login &&
        "btn px-6 btn-outline outline-textC rounded-none text-textC hover:bg-primary-color"
      }
      ${
        shopNow &&
        "btn border-none outline-none bg-primary-color hover:bg-on-hover text-white group w-36 rounded-none"
      }`}
    >
      <span className="">{children}</span>
      {shopNow && (
        <div className="flex items-center transition-all duration-300">
          <FaLongArrowAltRight className="w-3 ml-0 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
        </div>
      )}
    </div>
  );
};

export default Button;
