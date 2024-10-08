import { BsTelephone } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="max-w-[100vw]">
      <footer className="footer bg-[#1A1819] p-10 text-[#868284]">
        <nav>
          <div className="space-y-1 mb-4 text-white">
            <h6 className="font-bold text-xl mb-4 text-white">Contacts</h6>

            <div className="flex space-x-2 items-center">
              <BsTelephone className="font-semibold text-lg" />{" "}
              <p>+123456789</p>
            </div>

            <div className="flex space-x-2 items-center">
              <IoMailOutline className="font-semibold text-lg" />
              <a href="mailto: purchez@support.com"> purchez@support.com </a>
            </div>
          </div>

          {/* second part of first column */}
          <div className="text-white">
            <h6 className="font-bold text-xl mb-4 text-white">Social Media</h6>

            <div className="flex space-x-4 items-center">
              <FaInstagram className="hover:text-[#b3afb1] ease-in duration-150 font-semibold text-lg cursor-pointer" />
              <FaXTwitter className="hover:text-[#b3afb1] ease-in duration-150 font-semibold text-lg cursor-pointer" />
              <FiFacebook className="hover:text-[#b3afb1] ease-in duration-150 font-semibold text-lg cursor-pointer" />
            </div>
          </div>
        </nav>
        <nav>
          <h6 className="font-bold text-xl mb-4 text-white">Company</h6>
          <a className="link hover:text-white no-underline">About us</a>
          <a className="link hover:text-white no-underline">Services</a>
          <a className="link hover:text-white no-underline">Privacy Policy</a>
          <a className="link hover:text-white no-underline">Terms of service</a>
        </nav>
        <nav>
          <h6 className="font-bold text-xl mb-4 text-white">Product Links</h6>
          <a className="link hover:text-white no-underline">Categories</a>
          <a className="link hover:text-white no-underline">New Arrival</a>
          <a className="link hover:text-white no-underline">Features</a>
          <a className="link hover:text-white no-underline">Collections</a>
          <a className="link hover:text-white no-underline">Discount</a>
          <a className="link hover:text-white no-underline">Special Offer</a>
        </nav>
        <form>
          <h6 className="font-bold text-xl mb-4 text-white">Newsletter</h6>
          <fieldset className="form-control w-80">
            <p className="mb-8">
              Drop your email below to get update, promotions, coupons, and
              more!
            </p>
            <div className="join rounded-none">
              <input
                type="text"
                placeholder="Enter your email"
                className="input border-white join-item bg-[#1A1819] focus:outline-none focus:border-white focus:border-dashed"
              />
              <button className="btn bg-white join-item">
                <IoIosArrowRoundForward className="text-3xl" />
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
      <footer className="footer bg-[#1A1819] p-10 text-[#b3afb1] text-[.6rem] footer-center -mt-5">
        <aside>
          <p className="tracking-normal">
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
