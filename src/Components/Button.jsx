import { FaLongArrowAltRight } from "react-icons/fa";
import { cn } from "../lib/cn";

const Button = ({
  children,
  className,
  shopNow,
  btnType,
  btnHandler,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={btnType || "button"}
      onClick={btnHandler}
      className={cn(
        "group btn rounded-none bg-accent-color px-6 text-white hover:bg-on-hover",
        className,
      )}
    >
      {children}
      {shopNow && (
        <div className="flex items-center transition-all duration-300">
          <FaLongArrowAltRight className="ml-0 w-3 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
        </div>
      )}
    </button>
  );
};

export default Button;
