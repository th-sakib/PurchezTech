import { FaLongArrowAltRight } from "react-icons/fa";
import { cn } from "../lib/cn";

const Button = ({ children, className, shopNow, btnType, btnHandler }) => {
  return (
    <button
      type={btnType || "btn"}
      onClick={btnHandler}
      className={cn(
        "btn bg-accent-color text-white hover:bg-on-hover rounded-none px-6 group",
        className
      )}
    >
      {children}
      {shopNow && (
        <div className="flex items-center transition-all duration-300">
          <FaLongArrowAltRight className="w-3 ml-0 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
        </div>
      )}
    </button>
  );
};

export default Button;
