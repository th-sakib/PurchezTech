import { PiEye } from "react-icons/pi";
import { GrFormEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GiSelfLove } from "react-icons/gi";
import { MdAddShoppingCart } from "react-icons/md";

import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";
import { useSelector } from "react-redux";
import { selectUserRole } from "../redux/features/user/userSlice";

const ProductCard = ({
  product,
  isLoading,
  setIsOpenSidebar,
  setIsEditMode,
}) => {
  const userRole = useSelector(selectUserRole);
  const adminIcons = [
    { id: 1, icon: <PiEye />, handler: handlePreview },
    { id: 2, icon: <GrFormEdit />, handler: handleEdit },
  ];
  const customerIcons = [
    { id: 1, icon: <PiEye />, handler: handlePreview },
    { id: 2, icon: <MdAddShoppingCart />, handler: handleCart },
  ];

  // ====Preview handler====
  function handlePreview() {}

  // ====Edit handler====
  function handleEdit(data) {
    setIsOpenSidebar(true);
    setIsEditMode(true);
  }

  // ====Delete handler====
  function handleDelete() {
    console.log("deleing>>>");
  }

  // ====Wishlist handler====
  function handleWishlist() {}

  // ====Cart handler====
  function handleCart() {}

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
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl rounded-none font-josefin_sans border rounded-b-lg overflow-hidden group/parent">
          {/* floating buttons inside image  */}
          <div className="absolute -top-2 -right-2 cursor-pointer">
            {/* the visible icon  */}
            <div className="bg-accent-color w-12 h-12 text-white rounded-bl-full flex justify-center items-center absolute top-0 right-0 z-20 isolate group/inner">
              {userRole === "admin" ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="group-hover/inner:scale-110 transition-all duration-300 group-hover/inner:text-red-600"
                >
                  <RiDeleteBin5Line className="text-lg" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="group-hover/inner:scale-110 transition-all duration-300"
                >
                  <GiSelfLove />
                </button>
              )}
            </div>

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
          <figure className="h-48 group">
            <img
              className="h-56 group-hover:scale-105 transition-all duration-300"
              src={imageURL}
              alt="Shoes"
            />
          </figure>

          <div className="flex flex-row p-2 h-20">
            {/* title & desc. part  */}
            <div className="overflow-hidden flex flex-col justify-around w-4/5">
              <h2 className="text-sm font-semibold capitalize line leading-5">
                {title}
              </h2>
              <p
                className="text-xs text-faded-text line-clamp-2 text-pretty"
                title={description}
              >
                {description}
              </p>
            </div>

            {/* price part  */}
            <div className="text-right self-center absolute right-2">
              <div className="text-xl font-bold relative w-fit">
                <p className="text-xs line-through text-faded-text w-fit absolute -top-3 right-0">
                  ${price}
                </p>
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
                className="w-full bg-accent-color hover:bg-on-hover text-white border-none group rounded-b-md uppercase"
              >
                <MdAddShoppingCart className="text-xl" />
                add to cart
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
