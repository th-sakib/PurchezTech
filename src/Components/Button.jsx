import { FaLongArrowAltRight } from "react-icons/fa";

const Button = ({ children, shopNow }) => {
  console.log(children);
  return (
    <div
      className={`btn bg-primary-color text-white rounded-sm font-bolder text-sm h-11 min-h-11 border-none ${
        shopNow ? "hover:bg-[#111010] group w-36 " : "hover:bg-[#111010] "
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
