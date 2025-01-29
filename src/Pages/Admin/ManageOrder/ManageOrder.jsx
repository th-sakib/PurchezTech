import { useFetchAllOrderQuery } from "../../../redux/api/apiSlice.js";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import EditComp from "./EditComp.jsx";

const ManageOrder = () => {
  const { data: orders } = useFetchAllOrderQuery();

  return (
    <div className="m-4">
      {/* title section */}
      <section className="mt-4 flex items-center py-2">
        <h1 className="text-2xl font-bold capitalize">Orders</h1>
      </section>

      <div className="divider mt-0"></div>

      <div className="mr-16 min-h-screen overflow-x-scroll rounded-lg bg-white md:mr-0">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr>
              <th>Order Id</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Order Price(BDT)</th>
              <th>Order Items</th>
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
