import {
  useAddToCartMutation,
  useDeleteWishlistItemMutation,
  useFetchWishlistQuery,
  useLazyGetAuthenticityQuery,
} from "../../redux/api/apiSlice";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "../../lib/sweetAlert/toast";
import CartLoading from "../Cart/CartLoading";
import { IoHeartDislikeSharp } from "react-icons/io5";

const Wishlist = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const userData = useSelector((state) => state.user.userInfo);
  const userId = userData?._id;

  const navigate = useNavigate();

  const [deleteWishlistItem, { isLoading: deleting }] =
    useDeleteWishlistItemMutation();

  const [triggerAuthenticity] = useLazyGetAuthenticityQuery();
  const [addToCart, { isLoading: cartIsLoading }] = useAddToCartMutation();

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

  async function handleAddToCart(productId) {
    try {
      const res = await triggerAuthenticity().unwrap();

      if (res.statusCode === 200) {
        try {
          const res = await addToCart({
            userId,
            productId: productId,
            quantity: 1,
          }).unwrap();
          if (res.statusCode === 200) {
            toast.fire({
              title: "Product is added to the Cart",
              icon: "success",
              timer: 3000,
            });
          }
        } catch (error) {
          console.log(error);
          if (error?.data?.message === "Product is out of stock") {
            toast.fire({
              title: `${error?.data?.message}`,
              icon: "warning",
              timer: 4000,
            });
          } else {
            navigate("/auth/login");
            toast.fire({
              title: "Failed: Add product to cart",
              icon: "warning",
              timer: 4000,
            });
          }
        }
      }
    } catch (error) {
      navigate("/auth/login");
    }
  }

  if (wishlistInfo === undefined || wishlistInfo?.data?.list?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="h-[80vh] flex flex-col justify-center items-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <IoHeartDislikeSharp className="w-52 h-52 text-accent-color" />
            <p className="text-2xl font-bold">
              Your wishlist is <span className="text-error">Empty</span>
            </p>
          </div>
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
              <div className="absolute bottom-2 right-2">
                <Button btnHandler={() => handleAddToCart(item.productId)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Wishlist;
