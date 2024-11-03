import BannnerText from "./BannnerText";

// import images
import gamingConsole from "../../../assets/images/Banner-image/gaming-console-bg.png";
import laptop from "../../../assets/images/Banner-image/art-laptop-nobg.png";
import drone from "../../../assets/images/Banner-image/drone.png";
import smartPhone from "../../../assets/images/Banner-image/smartphone.png";

const Banner = () => {
  return (
    <div className="flex justify-center items-center mt-48 mb-8 relative mx-auto md:max-w-screen-xl">
      {/* banner text  */}
      <BannnerText />

      {/* scattered icons in the banner  */}
      <img
        className="absolute hidden lg:block right-28 -top-44 h-28 opacity-35"
        src={laptop}
        alt="gaming console icon not clickable"
      />
      <img
        className="absolute hidden lg:block left-28 -top-44 h-28 opacity-50"
        src={smartPhone}
        alt="gaming console icon not clickable"
      />
      <img
        className="absolute hidden lg:block right-16 bottom-0 h-28 opacity-50 -rotate-12"
        src={gamingConsole}
        alt="gaming console icon not clickable"
      />
      <img
        className="absolute hidden lg:block left-16 bottom-0 h-20 opacity-50"
        src={drone}
        alt="gaming console icon not clickable"
      />
    </div>
  );
};

export default Banner;
