const LoaderSpinner = ({ className }) => {
  return (
    <div className="">
      <span
        className={`loading loading-infinity text-center ${
          className ? className : "loading-lg"
        }`}
      ></span>
    </div>
  );
};

export default LoaderSpinner;
