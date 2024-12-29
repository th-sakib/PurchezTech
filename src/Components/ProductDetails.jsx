import { useNavigate, useParams } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetProductQuery,
  useLazyGetAuthenticityQuery,
} from "../redux/api/apiSlice";
import { GiSelfLove } from "react-icons/gi";
import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";
import { useSelector } from "react-redux";
import { toast } from "../lib/sweetAlert/toast";

const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: productInfo,
    isLoading,
    isFetching,
  } = useGetProductQuery({ id });

  const userInfo = useSelector((state) => state.user.userInfo);

  const [triggerAuthenticity] = useLazyGetAuthenticityQuery();
  const [addToCart] = useAddToCartMutation();

  if (isLoading || isFetching) {
    return (
      <div className="w-[100vw] h-[88vh] flex justify-center items-center">
        <LoaderSpinner />
      </div>
    );
  }

  const product = productInfo?.data;

  const discount = (
    ((product?.price - product?.salePrice) / product?.price) *
    100
  ).toFixed(2);

  const inStock = Boolean(Number(product?.totalStock));

  // add to cart handler
  async function handleCart() {
    try {
      const res = await triggerAuthenticity().unwrap();

      if (res.statusCode === 200) {
        try {
          const res = await addToCart({
            userId: userInfo._id,
            productId: id,
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
          if (error?.data?.message === "Product is out of stock") {
            toast.fire({
              title: `${error?.data?.message}`,
              icon: "warning",
              timer: 4000,
            });
          } else {
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

  return (
    <div className="flex flex-col md:flex-row md:items-center my-2 w-[90%] mx-auto gap-5 font-secondaryFont md:bg-white md:border border-accent-color">
      {/* image section */}
      <section className="md:shadow-lg">
        <img
          src={product?.imageURL}
          alt={product?.title}
          className="bg-accent-color/30 h-auto w-96"
        />
      </section>

      {/* text section */}
      <section className="text-left space-y-3 px-5 md:px-0 mb-4 md:mb-0">
        {/* title  */}
        <p className="text-2xl font-extrabold">{product?.title}</p>
        {/* price  */}
        <div className="font-secondaryFont font-bold">
          <p className="text-xl text-gray-600">${product?.salePrice}</p>
          {product?.price !== product?.salePrice ? (
            <p className="text-sm text-accent-color uppercase">
              {discount}% off
            </p>
          ) : (
            ""
          )}
        </div>
        {/* product description */}
        <div className="text-justify pr-4">
          <h4 className="font-bold text-lg">Product Details : </h4>
          <p>{product?.description}</p>
        </div>
        {/* in stock ? */}
        <p
          className={` border-l-2 border-l-accent-color pl-2 bg-accent-color/10 text-sm py-1 ${
            inStock ? "w-20 text-success" : "w-28 text-red-500"
          } `}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </p>
        {/* button  */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-xl bg-accent-color/10 p-3.5 px-3.5 hover:text-additional-color"
          >
            <GiSelfLove />
          </button>
          <Button btnHandler={handleCart}>Add to Cart</Button>
        </div>
      </section>
    </div>

    // TODO: add relatable products here
  );
};

export default ProductDetails;
