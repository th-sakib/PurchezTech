import {
  useDeleteCartItemMutation,
  useFetchCartQuery,
  useUpdateCartQuantityMutation,
} from "../../redux/api/apiSlice";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import Button from "../../Components/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import NoProduct from "../../Components/NoProduct";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../lib/sweetAlert/toast";
import CartLoading from "./CartLoading";
import { BsCart4 } from "react-icons/bs";

const Cart = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);

  const navigate = useNavigate();

  const [deleteCartItem, { isLoading: deleting }] = useDeleteCartItemMutation();
  const [updateCartQuantity, { isLoading: updating }] =
    useUpdateCartQuantityMutation();

  const {
    data: cartInfo,
    isLoading: cartLoading,
    isFetching: cartFetching,
  } = useFetchCartQuery({ userId: userInfo?._id });

  // calculations
  const subTotal =
    cartInfo && cartInfo?.data?.items.length !== 0
      ? cartInfo?.data?.items.reduce(
          (total, current) => (total + current?.salePrice) * current?.quantity,
          0
        )
      : 0;

  const discount = 0;

  const total = subTotal - (subTotal / 100) * discount;

  // handlers
  const handleDelete = async (cartItem) => {
    try {
      const res = await deleteCartItem({
        productId: cartItem?.productId,
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
      console.log("cart item deletion failed");
    }
  };

  if (cartLoading && cartFetching) {
    // Show skeleton loader only on first load
    return (
      <div className="flex flex-col gap-5 justify-center items-center my-4 capitalize px-3 w-screen mt-20 -translate-x-[15%]">
        <CartLoading />
        <CartLoading />
        <CartLoading />
      </div>
    );
  }

  const handlePlus = async (cartItem) => {
    if (cartItem?.maxStock > cartItem?.quantity) {
      try {
        await updateCartQuantity({
          productId: cartItem?.productId,
          userId: userInfo?._id,
          quantity: cartItem?.quantity + 1,
        }).unwrap();
      } catch (error) {
        toast.fire({
          title: "Product quantity can't be changed",
          icon: "warning",
        });
      }
    } else {
      toast.fire({
        title: `Max quantity can be ${cartItem?.quantity}`,
        icon: "warning",
      });
    }
  };
  const handleMinus = async (cartItem) => {
    if (cartItem?.quantity > 1) {
      try {
        await updateCartQuantity({
          productId: cartItem?.productId,
          userId: userInfo?._id,
          quantity: cartItem?.quantity - 1,
        }).unwrap();
      } catch (error) {
        toast.fire({
          title: "Product quantity can't be changed",
          icon: "warning",
        });
      }
    } else {
      toast.fire({
        title: `Minimum quantity is 1`,
        icon: "warning",
      });
    }
  };

  const handleQuantityChange = async (cartItem, value) => {
    const newQuantity = parseInt(value);

    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= cartItem?.maxStock
    ) {
      try {
        await updateCartQuantity({
          productId: cartItem?.productId,
          userId: userInfo?._id,
          quantity: newQuantity,
        }).unwrap();
      } catch (error) {
        toast.fire({
          title: "Failed ot update the quantity",
          icon: "error",
        });
      }
    } else {
      toast.fire({
        title: `quantity must be between 1 and ${cartItem?.maxStock}`,
        icon: "warning",
      });
    }
  };

  if (cartInfo === undefined || cartInfo?.data?.items?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="h-[80vh] flex flex-col justify-center items-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <BsCart4 className="w-32 h-32" />
            <p className="text-2xl font-bold">
              Your cart is <span className="text-error">Empty</span>
            </p>
          </div>
          <Button
            className="mt-3 hidden md:block"
            btnHandler={() => navigate("/all-products")}
          >
            Back to shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-center my-4 capitalize px-3 md:px-0">
      <section className="space-y-2">
        {/* header text section  */}
        <div className="flex justify-between items-center px-2 h-12">
          <p className="text-2xl font-bold">Cart</p>
          <p className="text-lg">total: {cartInfo?.data?.items?.length || 0}</p>
          <Button btnHandler={() => navigate("/all-products")}>
            Back to shopping
          </Button>
        </div>

        {/* product view section */}
        {cartInfo?.data?.items?.map((cartItem) => (
          <div
            key={cartItem?.productId}
            className="flex bg-white shadow-lg items-center justify-between md:w-[40vw] gap-5 rounded-sm pr-3 relative"
          >
            {/* image  */}
            <div className="bg-accent-color/10">
              <img
                src={cartItem?.image}
                alt={cartItem?.title}
                className="w-40 h-auto"
              />
            </div>
            {/* text-part  */}
            <div className="w-full">
              <p className="font-bold">{cartItem?.title}</p>
              <p className="font-bold">price: ${cartItem?.salePrice}</p>
              <div className="flex items-center">
                <p>quantity :</p>
                <input
                  type="number"
                  name="quantity"
                  id={`${cartItem?.productId}`}
                  min="1"
                  max={cartItem?.maxStock}
                  className="border border-accent-color w-6 h-7 ml-2 text-center"
                  value={cartItem?.quantity || 1}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) =>
                    handleQuantityChange(cartItem, e.target.value)
                  }
                />
                <div className="">
                  <FaAngleUp
                    className="bg-accent-color/20 border border-accent-color text-sm cursor-pointer select-none"
                    onClick={() => handlePlus(cartItem)}
                  />
                  <FaAngleDown
                    className="bg-accent-color/20 border border-accent-color text-sm cursor-pointer select-none"
                    onClick={() => handleMinus(cartItem)}
                  />
                </div>
              </div>
            </div>
            {/* delete button  */}
            <div className="">
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => handleDelete(cartItem)}
              >
                <TiDelete className="text-red-600 text-xl" />
              </button>
              <p className="line-through text-accent-color/40 absolute bottom-2 right-2">
                {cartItem?.price !== cartItem?.salePrice
                  ? "$" + cartItem?.price
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </section>
      {/* checkout section  */}
      <section className="mt-14">
        <div className=" mb-4 bg-white p-3 shadow-lg">
          <div className="flex justify-between items-center md:w-[20vw]">
            <p>subtotal</p>
            <p>${subTotal}</p>
          </div>
          <div className="divider my-1" />

          <div className="flex justify-between md:w-[20vw]">
            <p>shipping</p>
            <p>free</p>
          </div>
          <div className="divider my-1" />

          <div className="flex justify-between md:w-[20vw]">
            <p>coupon discount</p>
            <p>0%</p>
          </div>
          <div className="divider my-1" />

          <div className="flex justify-between md:w-[20vw]">
            <p>Total</p>
            <p>${total}</p>
          </div>

          <Link to="/checkout">
            <Button className={"w-full text-base font-secondaryFont mt-2"}>
              Checkout
            </Button>
          </Link>
        </div>

        <div className="bg-white p-2 shadow-lg">
          <input
            type="text"
            name="coupon"
            className="border border-accent-color w-full h-10 text-center"
            placeholder="Enter your coupon here"
          />
        </div>
      </section>
    </div>
  );
};

export default Cart;
