import {
  useDeleteWishlistItemMutation,
  useFetchWishlistQuery,
} from "../../redux/api/apiSlice";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import Button from "../../Components/Button";
import NoProduct from "../../Components/NoProduct";
import { useNavigate } from "react-router-dom";
import { toast } from "../../lib/sweetAlert/toast";
import CartLoading from "../Cart/CartLoading";

const Wishlist = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();

  const [deleteWishlistItem, { isLoading: deleting }] =
    useDeleteWishlistItemMutation();

  const {
    data: wishlistInfo,
    isLoading: wishlistLoading,
    isFetching: wishlistFetching,
  } = useFetchWishlistQuery({ userId: userInfo?._id });

  // handlers
  const handleDelete = async (item) => {
    try {
      const res = await deleteWishlistItem({
        productId: item?.productId,
        userId: userInfo?._id,
      }).unwrap();

      if (res?.statusCode === 200) {
        toast.fire({
          title: "The Product has been removed",
          icon: "warning",
          timer: 3000,
        });
      }
    } catch (error) {
      console.log("wishlist item deletion failed");
    }
  };

  if (wishlistInfo === "undefined" || wishlistInfo?.data?.list?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="h-[80vh] flex flex-col justify-center items-center">
          <NoProduct textContent={"Wishlist items is available"} />
          <Button
            className="mt-3 hidden md:block"
            btnHandler={() => navigate("/all-products")}
          >
            Add product to wishlist
          </Button>
        </div>
      </div>
    );
  }

  // if fetching or loading
  if (wishlistFetching && wishlistLoading) {
    // Show skeleton loader only on first load
    return (
      <div className="flex flex-col gap-5 justify-center items-center my-4 capitalize px-3 w-screen mt-20 -translate-x-[15%]">
        <CartLoading />
        <CartLoading />
        <CartLoading />
      </div>
    );
  }

  return (
    <div className="justify-center my-4 capitalize px-3 md:px-0 container mx-auto">
      <section className="space-y-2">
        {/* header text section  */}
        <div className="flex justify-between items-center px-2 h-12">
          <p className="text-2xl font-bold">Wishlist</p>
          <p className="text-lg">
            total: {wishlistInfo?.data?.list?.length || 0}{" "}
          </p>
        </div>

        {/* product view section */}
        {wishlistInfo?.data?.list?.map((item) => (
          <div
            key={item?.productId}
            className="flex bg-white shadow-lg items-center justify-between gap-5 rounded-sm pr-3 relative"
          >
            {/* image  */}
            <div className="bg-accent-color/10">
              <img
                src={item?.image}
                alt={item?.title}
                className="w-40 h-auto"
              />
            </div>
            {/* text-part  */}
            <div className="w-full">
              <p className="font-bold">{item?.title}</p>
              <p className="font-bold">price: ${item?.salePrice}</p>
            </div>
            {/* delete button  */}
            <div className="">
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => handleDelete(item)}
              >
                <TiDelete className="text-red-600 text-xl" />
              </button>
              <p className="line-through text-accent-color/40 absolute bottom-2 right-2">
                {item?.price !== item?.salePrice ? "$" + item?.price : ""}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Wishlist;
