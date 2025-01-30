import { useFetchAllOrderQuery } from "../../../redux/api/apiSlice.js";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import EditComp from "./EditComp.jsx";

const ManageOrder = () => {
  const { data: orders } = useFetchAllOrderQuery();

  return (
    <div className="">
      {/* title section */}
      <section className="flex items-center bg-white px-5 py-6">
        <h1 className="text-2xl font-bold capitalize">Manage Orders</h1>
      </section>

      <div className="m-4 mr-4 min-h-[80vh] overflow-x-auto overflow-y-hidden rounded-lg bg-white px-3">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr>
              <th>Order Id</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Order Price(BDT)</th>
              <th>Order Items</th>
              <th>Payment Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.order?.map((item) => (
              <tr key={item?._id} className="">
                <td># {item?._id}</td>
                <td>
                  <OrderStatus order={item} />
                </td>
                <td>{item?.createdAt.split("T")[0]}</td>
                <td>{item?.totalPrice}</td>
                <td className="">{item?.orderItems.length}</td>
                <td
                  className={`font-bold capitalize ${item?.paymentDetails?.status === "paid" ? "text-success" : ""}`}
                >
                  {item?.paymentDetails?.status}
                </td>
                <td className="flex items-center justify-start gap-2">
                  {/* details button */}
                  <button className="hover:text-additional-color">
                    <Link to={`/admin/orders/${item._id}`}>
                      <TbListDetails className="text-base" />
                    </Link>
                  </button>
                  {/* edit button */}
                  <div>
                    <EditComp orderItem={item} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function OrderStatus({ order }) {
  const tagColor =
    order?.orderStatus === "Cancelled"
      ? "text-error"
      : order?.orderStatus === "Processing"
        ? "text-accent"
        : order?.orderStatus === "Delivered"
          ? "text-success"
          : "text-success";

  return (
    <div className="font-bold">
      <div className={`badge badge-outline ${tagColor}`}>
        {order?.orderStatus}
      </div>
    </div>
  );
}

export default ManageOrder;
