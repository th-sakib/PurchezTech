import { LiaShippingFastSolid } from "react-icons/lia";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { MdSupportAgent } from "react-icons/md";

const supports = [
  {
    title: "fast & free Delivery",
    description: "Free delivery on all orders",
    icon: LiaShippingFastSolid,
  },
  {
    title: "Secure Payment",
    description: "Your Payments are safe & secure",
    icon: RiSecurePaymentFill,
  },
  {
    title: "money back guarantee",
    description: "money back guarantee if needed",
    icon: GiReturnArrow,
  },
  {
    title: "online support",
    description: "24/5 support available",
    icon: MdSupportAgent,
  },
];

const CustomerSupports = () => {
  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center items-center my-16 gap-4">
      {supports.map((support) => (
        <div
          key={support.title}
          className="rounded-sm bg-white flex flex-col justify-center items-center py-3 px-1 hover:shadow-lg"
        >
          {/* icon  */}
          <div>
            <support.icon className="h-14 w-14 my-2 " />
          </div>
          <div className="text-center my-1">
            <p className="font-bold">{support.title}</p>
            <p className="text-sm">{support.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerSupports;
