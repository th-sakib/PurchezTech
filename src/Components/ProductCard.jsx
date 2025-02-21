import { PiEye } from "react-icons/pi";
import { GiSelfLove } from "react-icons/gi";
import { MdAddShoppingCart } from "react-icons/md";

import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";
import { useSelector } from "react-redux";
import { selectUserRole } from "../redux/features/user/userSlice";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useLazyGetAuthenticityQuery,
} from "../redux/api/apiSlice";
import { toast } from "../lib/sweetAlert/toast";
import { replace, useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({
  product, // this is coming from product component
  productId, // from popularProduct
  totalSold, // from popular product
  isLoading,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = useSelector(selectUserRole);
  const userData = useSelector((state) => state.user.userInfo);
  const userId = userData?._id;

  // api endPoints from apiSlice
  const [triggerAuthenticity] = useLazyGetAuthenticityQuery();
  const [addToCart, { isLoading: cartIsLoading }] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  const customerIcons = [
    { id: 1, icon: <PiEye />, handler: handlePreview },
    { id: 2, icon: <MdAddShoppingCart />, handler: handleCart },
  ];

  // ====Preview handler====
  function handlePreview() {
    navigate(`/product-details/${product._id}`, replace);
  }

  // ====Wishlist handler====
  async function handleWishlist() {
    try {
      const res = await triggerAuthenticity().unwrap();

      if (res.statusCode === 200) {
        try {
          const res = await addToWishlist({
            userId,
            productId: product._id,
          }).unwrap();
          if (res.statusCode === 200) {
            toast.fire({
              title: "Product is added to Wishlist",
              icon: "success",
              timer: 3000,
            });
          }
        } catch (error) {
          if (error?.data?.message === "Product already exist in wishlist") {
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

  // ====Cart handler====
  async function handleCart() {
    try {
      const res = await triggerAuthenticity().unwrap();

      if (res.statusCode === 200) {
        try {
          const res = await addToCart({
            userId,
            productId: productId || product._id,
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

  const {
    title,
    description,
    imageURL,
    price,
    salePrice,
    totalStock,
    brand,
    category,
  } = product;

  return (
    <>
      {!isLoading ? (
        //======== The CARD  ==========
        <div className="group/parent card relative overflow-hidden rounded-none rounded-b-lg border bg-base-100 font-josefin_sans shadow-lg hover:shadow-2xl">
          <div className="absolute -right-2 -top-2 cursor-pointer">
            {/* the visible icon  */}
            <div className="group/inner absolute right-0 top-0 isolate z-20 flex h-12 w-12 items-center justify-center rounded-bl-full bg-accent-color text-white">
              {
                // wishlist button
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="transition-all duration-300 group-hover/inner:scale-110"
                >
                  <GiSelfLove />
                </button>
              }
            </div>

            {/* floating buttons inside image  */}
            <div className="absolute -right-5 top-3 isolate z-10 flex transform transition-all duration-300 group-hover/parent:-translate-x-16">
              {customerIcons.map((item) => (
                <button
                  key={item.id}
                  onClick={item.handler}
                  className="mr-1 rounded-full border border-accent-color p-0.5 text-lg text-accent-color transition-all duration-500 hover:border-on-hover hover:bg-accent-color hover:text-white"
                  type="button"
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          {/* image section  */}
          <figure
            className={`group h-36 p-2 md:h-44 ${
              location.pathname === "/all-products" ? "xl:h-36" : "xl:h-44"
            }`}
          >
            <img
              className="h-full transition-all duration-300 group-hover:scale-105"
              src={imageURL}
              alt="Shoes"
            />
          </figure>

          <div className="relative flex h-20 flex-row p-2">
            {/* title & desc. part  */}
            <div className="flex w-4/5 flex-col justify-around overflow-hidden">
              <h2
                className="line line-clamp-1 text-sm font-semibold capitalize leading-5"
                title={title}
              >
                {title}
              </h2>
              <p
                className="line-clamp-2 text-pretty text-xs text-faded-text"
                title={description}
              >
                {description}
              </p>
            </div>

            {/* total sold  */}
            {totalSold ? (
              <div className="absolute bottom-0 right-2 self-center text-right text-sm font-bold text-accent-color">
                {totalSold} Sold
              </div>
            ) : (
              ""
            )}

            {/* price part  */}
            <div className="absolute right-2 self-center text-right">
              <div className="relative w-fit text-xl font-bold">
                {price !== salePrice ? (
                  <p className="absolute -top-3.5 right-0 w-fit text-sm text-faded-text line-through">
                    ${price}
                  </p>
                ) : (
                  ""
                )}
                <div className="text-xl font-bold text-accent-color">
                  <span className="absolute -left-2 top-0 text-xs">$</span>
                  {salePrice}
                </div>
              </div>
            </div>
          </div>
          {/* Footer of the card */}
          <div className="card-actions justify-center">
            <Button
              btnHandler={handleCart}
              className="group flex w-full rounded-b-md border-none bg-accent-color px-0 uppercase text-white hover:bg-on-hover"
            >
              {cartIsLoading ? (
                <span className="text-xs">Adding to cart...</span>
              ) : (
                <span className="flex text-xs sm:gap-1 md:text-sm">
                  <MdAddShoppingCart className="text-base md:text-xl" />
                  add to cart
                </span>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full">
          <LoaderSpinner />
        </div>
      )}
    </>
  );
};

export default ProductCard;
