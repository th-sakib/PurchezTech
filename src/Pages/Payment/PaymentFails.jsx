import { FcHighPriority } from "react-icons/fc";
import { Link } from "react-router-dom";

const PaymentFails = () => {
  return (
    <div className="container mx-auto px-4 h-screen grid justify-center items-center capitalize">
      <section className="">
        <FcHighPriority className="h-32 w-32 shadow-2xl shadow-error rounded-full ml-auto mr-auto mb-8" />
        {/* text  */}
        <section className="space-y-2 mb-auto md:mb-0">
          <h1 className="text-3xl font-bold">payment Failed!</h1>
          <p>Your payment is failed due to some problem</p>
          <Link
            to="/cart"
            className="btn bg-error rounded-sm text-white hover:bg-error/80 border border-error mr-2"
          >
            View Cart
          </Link>
          <Link
            to="/all-products"
            className="btn btn-outline border-error rounded-sm hover:bg-error hover:border-error"
          >
            Continue shopping
          </Link>
        </section>
      </section>
    </div>
  );
};

export default PaymentFails;
