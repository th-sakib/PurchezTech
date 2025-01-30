import { useSelector } from "react-redux";
import {
  useCancelOderMutation,
  useFetchOrderQuery,
} from "../../redux/api/apiSlice.js";
import { useState } from "react";
import { TbCurrencyTaka, TbListDetails } from "react-icons/tb";
import { MdDetails, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import errorRobo from "../../assets/images/error-page.png";

const Order = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);

  const { data: orderList, isLoading } = useFetchOrderQuery({
    userId: userInfo?._id,
  });

  const [cancelOrder] = useCancelOderMutation();

  const handleDetailClick = (item) => {
    setSelectedOrder(item);
    document.getElementById("orderDetailsModal").showModal();
  };

  const handleCancel = async (item) => {
    try {
      const res = await cancelOrder({ orderId: item._id }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* meta tag start  */}
      <link
        rel="canonical"
        href="https://purcheztech.onrender.com/user/orders"
      />
      <title>Orders | PurchezTech</title>
      {/* meta tag end  */}
      <div className="m-4 mb-16">
        <h1 className="mb-2 ml-4 text-3xl font-bold text-gray-700 md:text-center">
          My Orders
        </h1>
        <div className="">
          {/* order cards */}
          <section className="">
            {isLoading ? (
              // loading
              <div className="grid grid-cols-1 items-center justify-center gap-2 orderSm:grid-cols-2 userDMd:grid-cols-1 userDLg:grid-cols-2 xl:grid-cols-3">
                {Array(8)
                  .fill()
                  .map((_, idx) => (
                    // loading
                    <div
                      key={idx}
                      className="relative m-3 animate-pulse space-y-1 rounded-lg border-2 border-gray-300 p-4"
                    >
                      <span className="absolute right-2 top-2 rounded-full bg-gray-200 px-2 text-sm font-bold text-white">
                        <div className="h-4 rounded bg-gray-400"></div>
                      </span>
                      <div>
                        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                      </div>
                      <div>
                        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                        </div>
                        <div className="flex items-center font-bold">
                          <div className="h-5 w-5 rounded bg-gray-200"></div>
                          <div className="h-4 w-16 rounded bg-gray-200"></div>
                        </div>
                      </div>
                      <div className="divider" />
                      <div className="flex items-center justify-around">
                        <button
                          type="button"
                          className="flex flex-col items-center justify-center gap-0.5 hover:text-gray-600"
                        >
                          <div className="h-6 w-6 rounded bg-gray-200"></div>
                          <div className="h-4 w-16 rounded bg-gray-200"></div>
                        </button>
                        <button
                          type="button"
                          className="flex flex-col items-center justify-center gap-0.5 hover:text-red-500"
                        >
                          <div className="h-6 w-6 rounded bg-gray-200"></div>
                          <div className="h-4 w-16 rounded bg-gray-200"></div>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : orderList?.data?.order.length <= 0 ? (
              // no orders
              <div className="flex h-[65vh] flex-col items-center justify-center gap-2">
                <img
                  src={errorRobo}
                  alt="error robo scared because no orders are there"
                  className="h-32"
                />
                <h2 className="text-xl font-bold">
                  You didn't place any orders yet
                </h2>
                <Link
                  to="/all-products"
                  className="btn btn-outline rounded-lg border-accent-color hover:bg-accent-color"
                >
                  Go for shop
                </Link>
              </div>
            ) : (
              // actual orders
              <div className="grid w-full grid-cols-1 items-center justify-center gap-0 orderSm:grid-cols-2 md:gap-2 userDMd:grid-cols-1 userDLg:grid-cols-2 xl:grid-cols-3">
                {orderList?.data?.order?.map((item) => (
                  <div
                    key={item?._id}
                    className="relative m-3 space-y-1 rounded-lg border border-accent-color p-4"
                  >
                    {/* items count  */}
                    <span className="absolute right-2 top-2 rounded-full bg-accent-color px-2 text-sm font-bold text-white">
                      {item?.orderItems.length} items
                    </span>
                    {/* order number */}
                    <div>
                      <h3 className="text-xs font-bold text-faded-text">
                        Order number:
                      </h3>
                      <p className="text-sm font-bold">{item?._id}</p>
                    </div>
                    {/* order date */}
                    <div>
                      <h3 className="text-xs font-bold text-faded-text">
                        Order date:
                      </h3>
                      <p className="text-sm font-bold">
                        {item?.createdAt.split("T")[0]} -{" "}
                        {item?.createdAt.split("T")[1].split(".")[0]}
                      </p>
                    </div>
                    {/* order status */}
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="mb-1 text-xs font-bold text-faded-text">
                          Order Status:
                        </h3>
                        <p
                          className={`badge badge-outline ${
                            item?.orderStatus === "Processing"
                              ? "text-warning"
                              : item?.orderStatus === "Cancelled"
                                ? "text-error"
                                : item?.orderStatus === "Delivered"
                                  ? "text-accent-color"
                                  : item?.orderStatus === "Shipped"
                                    ? "text-success"
                                    : ""
                          }`}
                        >
                          {item?.orderStatus}
                        </p>
                      </div>
                      {/* price  */}
                      <div className="flex items-center font-bold">
                        <TbCurrencyTaka className="text-xl" />{" "}
                        {item?.totalPrice}
                      </div>
                    </div>

                    <div className="divider" />
                    {/* buttons  */}
                    <div className="flex items-center justify-around">
                      <button
                        type="button"
                        className="flex flex-col items-center justify-center gap-0.5 hover:text-accent-color"
                        onClick={() => handleDetailClick(item)}
                      >
                        <TbListDetails />
                        <p className="font-secondaryFont text-xs font-bold text-gray-500">
                          <MdDetails />
                        </p>
                      </button>
                      <button
                        type="button"
                        className="flex flex-col items-center justify-center gap-0.5 hover:text-error"
                        onClick={() => handleCancel(item)}
                      >
                        <MdOutlineRemoveShoppingCart />
                        <p className="font-secondaryFont text-xs font-bold text-gray-500">
                          Cancel
                        </p>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* modal */}
          <dialog id="orderDetailsModal" className="modal capitalize">
            <div className="modal-box overflow-auto rounded-sm bg-gray-300/20 font-bold text-white backdrop-blur-md">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-circle btn-ghost btn-sm absolute right-1 top-0">
                  ✕
                </button>
              </form>
              {/* order details  */}
              {selectedOrder && (
                <>
                  <div className="mt-1 flex flex-col gap-3">
                    <div className="flex justify-between">
                      <p>order number</p>
                      <p className="font-thin">{selectedOrder?._id}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>order date</p>
                      <p className="font-thin">
                        {selectedOrder?.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>order price</p>
                      <p className="font-thin">{selectedOrder?.totalPrice}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>payment method</p>
                      <p className="font-thin">
                        {selectedOrder?.paymentDetails?.cardIssuer}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>payment status</p>
                      <p className="font-thin">
                        {selectedOrder?.paymentDetails?.status}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>order status</p>
                      <p
                        className={`badge badge-outline ${
                          selectedOrder?.orderStatus === "Processing"
                            ? "text-warning"
                            : selectedOrder?.orderStatus === "Cancelled"
                              ? "text-error"
                              : selectedOrder?.orderStatus === "Delivered"
                                ? "text-accent-color"
                                : selectedOrder?.orderStatus === "Shipped"
                                  ? "text-success"
                                  : ""
                        }`}
                      >
                        {selectedOrder?.orderStatus}
                      </p>
                    </div>
                  </div>

                  {/* products  */}
                  <div className="">
                    <h1>products</h1>
                    <div className="space-y-2 text-sm font-normal">
                      {selectedOrder?.orderItems.map((product) => (
                        <div
                          key={product?.product}
                          className="relative flex items-center justify-around"
                        >
                          <img
                            className="h-10 w-auto"
                            src={product?.image}
                            alt={product?.name}
                          />
                          <div className="ml-2 mr-auto md:ml-10">
                            <p>{product?.product}</p>
                            <p className="line-clamp-1 text-xs">
                              {product?.name}
                            </p>
                          </div>
                          <div className="">
                            <p>price: {product?.price}</p>
                            <p>quantity{product?.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </>
  );
};

export default Order;
