import { TbEdit } from "react-icons/tb";
import { useUpdateOrderStatusMutation } from "../../../redux/api/apiSlice";

export default function EditComp({ orderItem }) {
  const [updateOrder, { isLoading: updating }] = useUpdateOrderStatusMutation();
  const handleEdit = async (tranId, value) => {
    if (value !== "default") {
      try {
        const res = await updateOrder({ tranId, status: value });
        setCurrentStatus(value);
        toast.fire({
          title: "Status updated successfully",
          icon: "success",
          timer: 3000,
        });
      } catch (error) {
        console.log(error?.data?.message);
      }
    }
  };
  return (
    <div>
      <button className="hover:text-accent-color" onClick={handleEdit}>
        <TbEdit className="-mb-0.5 text-base" />
      </button>
    </div>
  );
}
