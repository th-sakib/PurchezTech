import BannnerText from "./BannnerText";

// import images
import gamingConsole from "../../../assets/images/Banner-image/gaming-console-bg.png";
import laptop from "../../../assets/images/Banner-image/art-laptop-nobg.png";
import drone from "../../../assets/images/Banner-image/drone.png";
import phone from "../../../assets/images/Banner-image/phone.png";

const Banner = () => {
  return (
    <div className="flex justify-center items-center my-48 relative">
      <BannnerText />
      <img
        className="absolute right-16 -top-32 h-28 opacity-50"
        src={phone}
        alt="gaming console icon not clickable"
      />
      <img
        className="absolute left-16 -top-32 h-28 opacity-50"
        src={laptop}
        alt="gaming console icon not clickable"
      />
      <img
        className="absolute right-16 -bottom-32 h-28 opacity-50 -rotate-12"
        src={gamingConsole}
        alt="gaming console icon not clickable"
      />
      <img
        className="absolute left-16 -bottom-32 h-20 opacity-50"
        src={drone}
        alt="gaming console icon not clickable"
      />
    </div>
  );
};

export default Banner;
