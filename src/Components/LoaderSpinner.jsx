const LoaderSpinner = ({ className }) => {
  return (
    <div className="min-w-screen min-h-screen flex-col justify-center items-center">
      <span
        className={`loading loading-infinity text-center ${
          className ? className : "loading-lg"
        }`}
      ></span>
    </div>
  );
};

export default LoaderSpinner;
