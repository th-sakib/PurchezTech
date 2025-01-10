import { useSelector } from "react-redux";
import {
  useCancelOderMutation,
  useFetchOrderQuery,
} from "../../redux/api/apiSlice.js";
import { useState } from "react";
import { TbCurrencyTaka, TbListDetails } from "react-icons/tb";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Order = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);

  const { data: orderList } = useFetchOrderQuery({ userId: userInfo?._id });

  const [cancelOrder, { isLoading: cancelling }] = useCancelOderMutation();

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
    <div className="m-4 mb-16">
      <h1 className="text-3xl font-bold mb-2 ml-4 md:text-center text-gray-700">
        My Orders
      </h1>
      <div className="">
        {/* order cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center capitalize">
          {orderList?.data?.order?.map((item) => (
            <div
              key={item?._id}
              className="rounded-lg border border-accent-color m-3 p-4 space-y-1 relative"
            >
              {/* items count  */}
              <span className="absolute right-2 top-2 font-bold bg-accent-color rounded-full px-2 text-white text-sm">
                {item?.orderItems.length} items
              </span>
              {/* order number */}
              <div>
                <h3 className="text-faded-text font-bold text-xs">
                  Order number:
                </h3>
                <p className="font-bold text-sm">{item?._id}</p>
              </div>
              {/* order date */}
              <div>
                <h3 className="text-faded-text font-bold text-xs">
                  Order date:
                </h3>
                <p className="font-bold text-sm">
                  {item?.createdAt.split("T")[0]} -{" "}
                  {item?.createdAt.split("T")[1].split(".")[0]}
                </p>
              </div>
              {/* order status */}
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-faded-text font-bold text-xs mb-1">
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
                <div className="font-bold flex items-center">
                  <TbCurrencyTaka className="text-xl" /> {item?.totalPrice}
                </div>
              </div>

              <div className="divider" />
              {/* buttons  */}
              <div className="flex justify-around items-center">
                <button
                  type="button"
                  className="flex flex-col justify-center items-center gap-0.5 hover:text-accent-color"
                  onClick={() => handleDetailClick(item)}
                >
                  <TbListDetails />
                  <p className="text-gray-500 font-bold font-secondaryFont text-xs">
                    Details
                  </p>
                </button>
                <button
                  type="button"
                  className="flex flex-col justify-center items-center gap-0.5 hover:text-error"
                  onClick={() => handleCancel(item)}
                >
                  <MdOutlineRemoveShoppingCart />
                  <p className="text-gray-500 font-bold font-secondaryFont text-xs">
                    Cancel
                  </p>
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* modal */}
        <dialog id="orderDetailsModal" className="modal capitalize">
          <div className="modal-box rounded-sm  overflow-auto">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-1 top-0">
                ✕
              </button>
            </form>
            {/* order details  */}
            {selectedOrder && (
              <>
                <div className="flex gap-3 flex-col">
                  <div className="flex justify-between">
                    <p>order number</p>
                    <p>{selectedOrder?._id}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>order date</p>
                    <p>{selectedOrder?.createdAt.split("T")[0]}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>order price</p>
                    <p>{selectedOrder?.totalPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>payment method</p>
                    <p>{selectedOrder?.paymentDetails?.cardIssuer}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>payment status</p>
                    <p>{selectedOrder?.paymentDetails?.status}</p>
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
                  <div className="font-normal text-sm space-y-2">
                    {selectedOrder?.orderItems.map((product) => (
                      <div
                        key={product?.product}
                        className="flex items-center justify-around relative"
                      >
                        <img
                          className="h-10 w-auto"
                          src={product?.image}
                          alt={product?.name}
                        />
                        <div className="mr-auto ml-2 md:ml-10">
                          <p>{product?.product}</p>
                          <p className="text-xs line-clamp-1">
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
  );
};

export default Order;
