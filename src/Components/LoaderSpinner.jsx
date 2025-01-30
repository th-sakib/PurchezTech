const LoaderSpinner = ({ className }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <span
        className={`loading loading-infinity text-center ${
          className ? className : "loading-lg"
        }`}
      ></span>
    </div>
  );
};

export default LoaderSpinner;
