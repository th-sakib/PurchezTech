import { useSelector } from "react-redux";
import { useState } from "react";
import {
  useFetchAllOrderQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/api/apiSlice.js";
import { toast } from "../../../lib/sweetAlert/toast.js";

const ManageOrder = () => {
  const [currentStatus, setCurrentStatus] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [updateOrder, { isLoading: updating }] = useUpdateOrderStatusMutation();
  const { data: orders } = useFetchAllOrderQuery();

  const handleDetailClick = (item) => {
    setSelectedOrder(item);
    document.getElementById("orderDetailsModal").showModal();
  };

  const handleUpdate = async (user, value) => {
    try {
      const res = await updateOrder({ userId: user, status: value });
      setCurrentStatus(value);
      if (res?.statusCode === 200) {
        toast.fire({
          title: "Status updated successfully",
          icon: "success",
          timer: 3000,
        });
      }
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-6 ml-4 md:text-center text-gray-700">
        My Orders
      </h1>
      <div className="overflow-x-auto mr-16 md:mr-0">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User Id</th>
              <th>Order Date</th>
              <th>Order Price(BDT)</th>
              <th>Order Items</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.order?.map((item) => (
              <tr key={item?._id}>
                <td>{item?.user}</td>
                <td>{item?.createdAt.split("T")[0]}</td>
                <td>{item?.totalPrice}</td>
                <td>{item?.orderItems.length}</td>
                <th>
                  <button
                    className="btn bg-accent-color text-white hover:bg-on-hover"
                    onClick={() => handleDetailClick(item)}
                  >
                    details
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>

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
                        selectedOrder?.orderStatus === "Processing" ||
                        currentStatus === "Processing"
                          ? "text-warning"
                          : selectedOrder?.orderStatus === "Cancelled" ||
                            currentStatus === "Processing"
                          ? "text-error"
                          : selectedOrder?.orderStatus === "Delivered" ||
                            currentStatus === "Processing"
                          ? "text-accent-color"
                          : selectedOrder?.orderStatus === "Shipped" ||
                            currentStatus === "Processing"
                          ? "text-success"
                          : ""
                      }`}
                    >
                      {currentStatus || selectedOrder?.orderStatus}
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
            {/* admin update status button  */}
            <div>
              <select
                name="orderStatus"
                id="orderStatus"
                onChange={(e) =>
                  handleUpdate(selectedOrder?.user, e.target.value)
                }
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ManageOrder;
