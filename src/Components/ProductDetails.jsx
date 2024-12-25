import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/api/apiSlice";
import { GiSelfLove } from "react-icons/gi";
import Button from "./Button";
import LoaderSpinner from "./LoaderSpinner";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    data: productInfo,
    isLoading,
    isFetching,
  } = useGetProductQuery({ id });

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

  return (
    <div className="flex flex-col lg:flex-row lg:items-center my-2 w-[90%] mx-auto gap-5 md:gap-10 font-secondaryFont bg-white border border-accent-color">
      {/* image section */}
      <section className="shadow-lg">
        <img
          src={product?.imageURL}
          alt={product?.title}
          className="bg-accent-color/30 h-full w-full"
        />
      </section>
      {/* text section */}
      <section className="text-left space-y-3 px-5 lg:px-0 mb-4 lg:mb-0">
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
          <Button>Add to Cart</Button>
        </div>
      </section>
    </div>

    // TODO: add relatable products here
  );
};

export default ProductDetails;
