import { useState } from "react";
import { useFetchAllOrderQuery } from "../../../redux/api/apiSlice.js";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import EditComp from "./EditComp.jsx";

const ManageOrder = () => {
  const { data: orders } = useFetchAllOrderQuery();

  return (
    <div className="m-4">
      <h1 className="mb-6 ml-4 text-3xl font-bold text-gray-700 md:text-center">
        Manage Orders
      </h1>
      <div className="mr-16 overflow-x-auto md:mr-0">
        <table className="table">
          {/* head */}
          <thead className="text-center">
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
              <tr key={item?._id} className="text-center">
                <td>{item?.user}</td>
                <td>{item?.createdAt.split("T")[0]}</td>
                <td>{item?.totalPrice}</td>
                <td className="">{item?.orderItems.length}</td>
                <td className="flex items-center justify-center gap-2">
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

export default ManageOrder;
