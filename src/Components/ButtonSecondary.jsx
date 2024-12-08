const ButtonSecondary = ({ children, className }) => {
  return (
    <div
      className={`h-12 flex justify-center items-center text-black border border-accent-color rounded-none relative  group cursor-pointer overflow-hidden hover:text-white transition-all duration-300 capitalize font-bold ${className}`}
    >
      <span
        className="w-52 h-20 rotate-[35deg]
     bg-accent-color absolute -left-[5.5rem] top-5 group-hover:scale-y-[9] group-hover:scale-x-[5] z-0 transition-all duration-300 "
      ></span>

      <p className="z-10 group-hover:text-white">{children}</p>
    </div>
  );
};

export default ButtonSecondary;
