import { PiEye } from "react-icons/pi";
import { GrFormEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GiSelfLove } from "react-icons/gi";
import { MdAddShoppingCart } from "react-icons/md";

import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../redux/features/user/userSlice";
import { setProduct } from "../redux/features/common/productSlice";
import {
  useAddToCartMutation,
  useAddToWishlistMutation,
  useDeleteProductMutation,
  useLazyGetAuthenticityQuery,
} from "../redux/api/apiSlice";
import { toast } from "../lib/sweetAlert/toast";
import Swal from "sweetalert2";
import { replace, useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({
  product, // this is coming from product component
  productId, // from popularProduct
  totalSold, // from popular product
  isLoading,
  setIsOpenSidebar,
  setIsEditMode,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const userRole = useSelector(selectUserRole);
  const userData = useSelector((state) => state.user.userInfo);
  const userId = userData?._id;

  // api endPoints from apiSlice
  const [deleteProduct] = useDeleteProductMutation();
  const [triggerAuthenticity] = useLazyGetAuthenticityQuery();
  const [addToCart, { isLoading: cartIsLoading }] = useAddToCartMutation();
  const [addToWishlist, { isLoading: wishlistIsLoading }] =
    useAddToWishlistMutation();

  const adminIcons = [
    { id: 1, icon: <PiEye />, handler: handlePreview },
    { id: 2, icon: <GrFormEdit />, handler: handleEdit },
  ];
  const customerIcons = [
    { id: 1, icon: <PiEye />, handler: handlePreview },
    { id: 2, icon: <MdAddShoppingCart />, handler: handleCart },
  ];

  // ====Preview handler====
  function handlePreview() {
    if (userRole !== "admin") {
      navigate(`/product-details/${product._id}`);
    } else {
      navigate(`/admin/product-details/${product._id}`, replace);
    }
  }

  // ====Edit handler====
  function handleEdit(data) {
    setIsOpenSidebar(true);
    setIsEditMode(true);
    dispatch(setProduct(data));
  }

  // ====Delete handler====
  async function handleDelete() {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteProduct(product._id);
          toast.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
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
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl rounded-none font-josefin_sans border rounded-b-lg overflow-hidden group/parent relative">
          <div className="absolute -top-2 -right-2 cursor-pointer">
            {/* the visible icon  */}
            <div className="bg-accent-color w-12 h-12 text-white rounded-bl-full flex justify-center items-center absolute top-0 right-0 z-20 isolate group/inner">
              {userRole === "admin" ? (
                // delete button
                <button
                  type="button"
                  onClick={() => handleDelete(product)}
                  className="group-hover/inner:scale-110 transition-all duration-300 group-hover/inner:text-red-600"
                >
                  <RiDeleteBin5Line className="text-lg" />
                </button>
              ) : (
                // wishlist button
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="group-hover/inner:scale-110 transition-all duration-300"
                >
                  <GiSelfLove />
                </button>
              )}
            </div>

            {/* floating buttons inside image  */}
            <div className="absolute top-3 -right-5 flex z-10 transform isolate group-hover/parent:-translate-x-16 transition-all duration-300">
              {userRole === "admin"
                ? adminIcons.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => item.handler(product)}
                      className="border border-accent-color text-accent-color p-0.5 text-lg rounded-full mr-1 hover:text-white hover:border-on-hover hover:bg-accent-color transition-all duration-500"
                      type="button"
                    >
                      {item.icon}
                    </button>
                  ))
                : customerIcons.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.handler}
                      className="border border-accent-color text-accent-color p-0.5 text-lg rounded-full mr-1 hover:text-white hover:border-on-hover hover:bg-accent-color transition-all duration-500"
                      type="button"
                    >
                      {item.icon}
                    </button>
                  ))}
            </div>
          </div>

          {/* image section  */}
          <figure
            className={`h-36 md:h-44 group ${
              location.pathname === "/all-products" ? "xl:h-36" : "xl:h-44"
            }`}
          >
            <img
              className="h-40 group-hover:scale-105 transition-all duration-300"
              src={imageURL}
              alt="Shoes"
            />
          </figure>

          <div className="flex flex-row p-2 h-20 relative">
            {/* title & desc. part  */}
            <div className="overflow-hidden flex flex-col justify-around w-4/5">
              <h2
                className="text-sm font-semibold capitalize line leading-5 line-clamp-1"
                title={title}
              >
                {title}
              </h2>
              <p
                className="text-xs text-faded-text line-clamp-2 text-pretty"
                title={description}
              >
                {description}
              </p>
            </div>

            {/* total sold  */}
            {totalSold ? (
              <div className="text-right self-center absolute right-2 bottom-0 font-bold text-accent-color">
                {totalSold} Sold
              </div>
            ) : (
              ""
            )}

            {/* price part  */}
            <div className="text-right self-center absolute right-2">
              <div className="text-xl font-bold relative w-fit">
                {price !== salePrice ? (
                  <p className="text-sm line-through text-faded-text w-fit absolute -top-3.5 right-0">
                    ${price}
                  </p>
                ) : (
                  ""
                )}
                <div className="text-xl font-bold text-accent-color">
                  <span className="text-xs absolute top-0 -left-2">$</span>
                  {salePrice}
                </div>
              </div>
            </div>
          </div>
          {/* Footer of the card */}
          <div className="card-actions justify-center">
            {userRole === "admin" ? (
              <Button
                btnHandler={handleDelete}
                className="w-full bg-accent-color hover:bg-on-hover text-white border-none group rounded-b-md uppercase"
              >
                <RiDeleteBin5Line className="text-xl -mt-1" />
                <p>Delete Product</p>
              </Button>
            ) : (
              <Button
                btnHandler={handleCart}
                className="w-full bg-accent-color hover:bg-on-hover text-white border-none group rounded-b-md uppercase flex px-0"
              >
                {cartIsLoading ? (
                  <span className="text-xs">Adding to cart...</span>
                ) : (
                  <span className="text-xs md:text-sm flex sm:gap-1">
                    <MdAddShoppingCart className="text-base md:text-xl" />
                    add to cart
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
};

export default ProductCard;
