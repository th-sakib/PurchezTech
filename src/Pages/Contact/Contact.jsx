import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-[92vh] bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 px-6 mb-8 lg:mb-0">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Have questions or feedback? We're here to help. Use the form to send
            us a message, or reach us directly via the provided contact details
            below.
          </p>
          <div className="text-gray-700">
            <p className="mb-4 flex items-center">
              <FaEnvelope className="text-accent-color mr-2" />{" "}
              <span className="font-semibold">Email:</span>{" "}
              purcheztech@customercare.com
            </p>
            <p className="mb-4 flex items-center">
              <FaPhoneAlt className="text-accent-color mr-2" />{" "}
              <span className="font-semibold">Phone:</span> +1 (555) 123-4567
            </p>
            <p className="mb-4 flex items-center">
              <FaMapMarkerAlt className="text-accent-color mr-2" />{" "}
              <span className="font-semibold">Address:</span> 123 Tech Lane,
              Silicon Valley, CA
            </p>
            <p className="text-sm text-gray-500">
              Our support team is available Monday through Friday from 9 AM to 5
              PM PST.
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 px-6">
          <div className="bg-white shadow-xl rounded-sm p-8">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative col-span-1">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-additional-color focus:border-accent-color sm:text-base"
                />
              </div>

              <div className="relative col-span-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-additional-color focus:border-accent-color sm:text-base"
                />
              </div>

              <div className="relative col-span-full">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  required
                  className="peer block w-full px-4 py-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-additional-color focus:border-accent-color sm:text-base"
                ></textarea>
              </div>

              <button
                type="submit"
                className="col-span-full bg-gradient-to-r from-accent-color to-accent-color/80 text-white font-semibold py-3 px-4 rounded-sm shadow-md hover:from-accent-color hover:to-accent-color focus:outline-none focus:ring-2 focus:ring-additional-color focus:ring-offset-2"
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
