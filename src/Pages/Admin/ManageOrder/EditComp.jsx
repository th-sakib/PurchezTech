import { TbEdit } from "react-icons/tb";
import { useUpdateOrderStatusMutation } from "../../../redux/api/apiSlice";
import { useState } from "react";
import { toast } from "../../../lib/sweetAlert/toast";

export default function EditComp({ orderItem }) {
  const [currentStatus, setCurrentStatus] = useState("");
  const [updateOrder, { isLoading: updating }] = useUpdateOrderStatusMutation();

  const orderStatus = [
    {
      id: 1,
      status: "Processing",
      color: "text-accent",
    },
    {
      id: 2,
      status: "Delivered",
      color: "text-success",
    },
    {
      id: 3,
      status: "Shipped",
      color: "text-success",
    },
    {
      id: 4,
      status: "Cancelled",
      color: "text-error",
    },
  ];

  const handleEdit = async (value) => {
    const tranId = orderItem?.paymentDetails?.tranID;
    // const value = orderItem?.orderStatus;

    try {
      const res = await updateOrder({ tranId, status: value });
      setCurrentStatus(value);
      toast.fire({
        title: "Status updated successfully",
        icon: "success",
        timer: 3000,
      });
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="">
          <button className="hover:text-accent-color">
            <TbEdit className="-mb-0.5 text-base" />
          </button>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-md bg-base-100 p-2 shadow"
        >
          {orderStatus.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer rounded-md p-2 font-bold hover:bg-gray-500 ${item.color}`}
              onClick={() => handleEdit(item.status)}
            >
              {item.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
