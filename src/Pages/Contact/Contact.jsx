import { toast } from "../../lib/sweetAlert/toast";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_WEB3Form_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.fire({
        title: "Email sent!",
        icon: "success",
      });
      event.target.reset();
    } else {
      console.log("error while sending mail");
      console.log("Error", data);
    }
  };

  return (
    <div className="bg-[#fff] flex items-start justify-center px-4 py-4">
      <div className="md:max-w-[82%] bannerMd:max-w-[78%] lg:max-w-[82%] xl:max-w-[1200px] xxl:max-w-[1350px] mx-auto flex flex-wrap justify-between">
        {/* Left Side Content */}
        <div className="w-full lg:w-[45%] px-6 mb-8 lg:mb-0 ">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
            Frequently asked questions
          </h2>
          <div className="collapse collapse-plus mb-2 bg-base-200 rounded-sm">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What is Purchez Tech?
            </div>
            <div className="collapse-content">
              <p className="text-sm">
                Purchez Tech is a leading e-commerce platform that offers a wide
                range of technology products, including laptops, smartphones,
                gadgets, accessories, and more.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus mb-2 bg-base-200 rounded-sm">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Where is Purchez Tech based?
            </div>
            <div className="collapse-content">
              <p className="text-sm">
                Purchez Tech operates online and serves customers globally. For
                specific details about our offices or shipping warehouses,
                contact us
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 rounded-sm">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Can I modify or cancel my order after placing it?
            </div>
            <div className="collapse-content">
              <p className="text-sm">
                Orders can be modified or canceled anytime them. After shipping,
                the order is processed for shipping and cannot be changed.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-[55%] px-6">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
            Contact us
          </h2>
          <div className="bg-transparent">
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="relative col-span-1">
                <input
                  type="text"
                  id="firstName"
                  name="name"
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
