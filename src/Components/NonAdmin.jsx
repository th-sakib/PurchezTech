import { Link } from "react-router-dom";
import angryRobo from "../assets/images/angry-robo.jpeg";

const NonAdmin = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen font-mono text-black selection:bg-accent-color/30">
      {" "}
      {/* TODO: text-color */}
      {/* image */}
      <div className="relative mb-3 mr-60">
        <img
          className="h-40"
          src={angryRobo}
          alt="Error page image not found"
        />

        <span className="font-sankofa font-extrabold text-4xl absolute bottom-7 left-20">
          404
        </span>
      </div>
      {/* texts  */}
      <div className="leading-10">
        <h1 className="text-4xl uppercase font-josefin_sans font-bold">
          Access denied
        </h1>
        <p>This is not where you belong</p>
        <p>Please go back!</p>

        <Link to="/">
          <button className="btn btn-outline bg-green-800 text-white mt-8 w">
            Go back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NonAdmin;
