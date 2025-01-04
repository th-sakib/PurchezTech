import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-[92vh] bg-[#fff] flex items-center justify-center px-4 py-12">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Left Side Content */}
        <div className="w-full lg:w-[30%] px-6 mb-8 lg:mb-0 ">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
            Connect With Us
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Have questions or feedback? We're here to help. Use the form to send
            us a message, or reach us directly via the provided contact details
            below.
          </p>
          <div className="text-gray-700">
            <p className="mb-4 flex items-center">
              <FaEnvelope className="text-accent-color mr-2" />
              <span className="font-semibold">Email:</span>
              purcheztech@customercare.com
            </p>
            <p className="mb-4 flex items-center text-sm">
              <FaPhoneAlt className="text-accent-color mr-2" />
              <span className="font-semibold mr-1">Phone:</span> +1 (555)
              123-4567
            </p>
            <p className="mb-4 flex items-center text-xs">
              <FaMapMarkerAlt className="text-accent-color mr-2" />
              <span className="font-semibold mr-1">Address: </span>Planet Earth,
              Solar System, Milky Way Galaxy, Universe.
            </p>
            <p className="text-sm text-gray-500">
              Our support team is available Monday through Friday from 9 AM to 5
              PM PST.
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-[70%] px-6">
          <div className="bg-transparent md:p-8">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative col-span-1">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 bg-faded-text/20 focus:outline-none focus:ring-2 focus:border-accent-color/50 sm:text-base"
                />
              </div>

              <div className="relative col-span-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-4 py-3 bg-faded-text/20 focus:outline-none focus:ring-2 focus:border-accent-color/50 sm:text-base"
                />
              </div>

              <div className="relative col-span-full">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  required
                  className="w-full h-56 md:px-4 py-3 bg-faded-text/20 focus:outline-none focus:ring-2 focus:border-accent-color/50 sm:text-base"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-40 bg-gradient-to-r from-accent-color to-accent-color/80 text-white font-semibold py-3 px-4 rounded-sm shadow-md hover:from-accent-color hover:to-accent-color focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
