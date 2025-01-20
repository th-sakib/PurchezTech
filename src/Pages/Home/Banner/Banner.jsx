import BannerText from "./BannerText";
import Slider from "./Slider.jsx";

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-center items-center my-4">
      {/* text section  */}
      <div className="w-full">
        <BannerText />
      </div>

      {/* Image section  */}
      <div className="w-full grid place-items-center lg:place-items-end mt-8">
        <Slider />
      </div>
    </div>
  );
};

export default Banner;
