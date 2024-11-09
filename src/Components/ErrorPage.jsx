import { Link } from "react-router-dom";
import errorRobo from "../assets/images/error-page.png";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen font-mono text-black selection:bg-accent-color/30">
      {" "}
      {/* TODO: text-color */}
      {/* image */}
      <div className="relative mb-3 mr-60">
        <img
          className="h-40"
          src={errorRobo}
          alt="Error page image not found"
        />

        <span className="font-sankofa font-extrabold text-4xl absolute bottom-7 left-20">
          404
        </span>
      </div>
      {/* texts  */}
      <div className="leading-10">
        <h1 className="text-4xl uppercase font-josefin_sans font-bold">
          page not found
        </h1>
        <p>We looked this page everywhere</p>
        <p>Are you sure the website URL is correct?</p>
        <p>Get in touch with the site owner.</p>
        <Link to="/">
          <button className="btn btn-outline bg-primary-color text-white mt-8 w">
            Go back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
