import {
  useGetAllUserQuery,
  useMakeAdminMutation,
} from "../../../redux/api/apiSlice";
import robotAvatar from "../../../assets/images/robot-avatar.png";
import Button from "../../../Components/Button";
import { toast } from "../../../lib/sweetAlert/toast";
import Swal from "sweetalert2";

const Users = () => {
  const { data: users, isLoading, isFetching } = useGetAllUserQuery();
  const [makeAdmin] = useMakeAdminMutation();

  const handleAdmin = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await makeAdmin(userId).unwrap();

          if (res.statusCode === 200) {
            toast.fire({
              title: "Role has been changed",
              icon: "success",
            });
          }
        } catch (error) {
          toast.fire({
            title: "Failed to change role",
            icon: "error",
          });
          console.log(error?.message);
        }
      }
    });
  };

  return (
    <div className="">
      {/* title section */}
      <section className="flex items-center bg-white px-5 py-6">
        <h1 className="text-2xl font-bold capitalize">Manage Users</h1>
      </section>

      {(isLoading || isFetching) && <UserTableSkeleton />}
      <div className="m-4 mr-4 min-h-[80vh] overflow-x-auto overflow-y-hidden rounded-lg bg-white capitalize">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr>
              <th>User</th>
              <th>User Till</th>
              <th>Role</th>
              <th>action</th>
            </tr>
          </thead>
          {/* body  */}
          <tbody>
            {users?.data?.map((item) => (
              <tr key={item?._id} className="">
                {/* avatar column */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item?.avatar || robotAvatar}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div className="min-w-48">
                      <div className="font-bold">{item?.fullName}</div>
                      <div className="text-sm opacity-50">{item?.username}</div>
                    </div>
                  </div>
                </td>
                {/* =============================== */}
                <td className="min-w-28">{item?.createdAt.split("T")[0]}</td>
                <td>{item?.role}</td>
                {/* button */}
                <td>
                  {item?.role === "admin" ? (
                    <Button
                      className={
                        "w-36 cursor-not-allowed rounded-lg bg-gray-400 hover:bg-gray-400"
                      }
                    >
                      Admin
                    </Button>
                  ) : (
                    <Button
                      btnHandler={() => handleAdmin(item._id)}
                      className={"w-36 rounded-lg"}
                    >
                      Make Admin
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserTableSkeleton = () => {
  return (
    <div className="m-4 mr-4 min-h-[80vh] overflow-x-auto overflow-y-hidden rounded-lg bg-white capitalize">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>User Till</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="animate-pulse">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12 bg-gray-300"></div>
                  </div>
                  <div className="min-w-48">
                    <div className="h-4 w-32 rounded bg-gray-300"></div>
                    <div className="mt-1 h-3 w-24 rounded bg-gray-300"></div>
                  </div>
                </div>
              </td>
              <td>
                <div className="h-4 w-28 rounded bg-gray-300"></div>
              </td>
              <td>
                <div className="h-4 w-20 rounded bg-gray-300"></div>
              </td>
              <td>
                <div className="h-8 w-36 rounded bg-gray-300"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
