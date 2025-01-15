import BannerText from "./BannerText";
import bannerImg from "../../../assets/images/Banner-image/bannerImage.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center my-4">
      {/* text section  */}
      <div className="w-full">
        <BannerText />
      </div>

      {/* Image section  */}
      <div className="w-full hidden md:block">
        <img
          src={bannerImg}
          alt="Banner Image for PurchEZTech"
          className="w-6/6 ml-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
