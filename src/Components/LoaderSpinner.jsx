import React from "react";

const LoaderSpinner = ({ className }) => {
  return (
    <div>
      <span
        className={`loading loading-infinity ${
          className ? className : "loading-lg"
        }`}
      ></span>
    </div>
  );
};

export default LoaderSpinner;
