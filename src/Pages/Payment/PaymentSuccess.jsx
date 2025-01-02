import { FcOk } from "react-icons/fc";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="container mx-auto px-4 h-screen grid justify-center items-center capitalize">
      <section className="">
        <FcOk className="h-32 w-32 shadow-2xl shadow-success rounded-full ml-auto mr-auto mb-8" />
        {/* text  */}
        <section className="space-y-2 mb-auto md:mb-0">
          <h1 className="text-3xl font-bold">payment successful</h1>
          <p>Your payment is successfully received</p>
          <Link
            to="/user/orders"
            className="btn bg-success rounded-sm text-white hover:bg-success/80 border border-success mr-2"
          >
            View order
          </Link>
          <Link
            to="/all-products"
            className="btn btn-outline border-success rounded-sm hover:bg-success hover:border-success"
          >
            Continue shopping
          </Link>
        </section>
      </section>
    </div>
  );
};

export default PaymentSuccess;
