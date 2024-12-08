import Button from "./Button";
import ButtonSecondary from "./ButtonSecondary";
import LoaderSpinner from "./LoaderSpinner";

const ProductCard = ({ product, isLoading }) => {
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
        <div className="card bg-base-100 shadow-xl rounded-none font-josefin_sans border border-b-accent-color border-t-black border-r-black border-l-accent-color group-hover:border-accent-color">
          {/* image section  */}
          <figure className="h-52 bg-[#b2e1f8]">
            <img className="h-56" src={imageURL} alt="Shoes" />
          </figure>

          <div className="flex flex-row p-2 h-24">
            {/* title & desc. part  */}
            <div className="overflow-hidden flex flex-col justify-around w-3/4">
              <h2 className="text-base font-semibold uppercase line leading-5">
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
                <p className="text-xs line-through text-[#83b5c1] w-fit absolute -top-3 right-0">
                  ${price}
                </p>
                <span className="text-xs absolute top-0 -left-2">$</span>
                {salePrice}
              </div>
            </div>
          </div>
          {/* Footer of the card */}
          <div className="card-actions justify-center">
            <ButtonSecondary className="w-full bg-black text-white border-none group">
              add to cart
            </ButtonSecondary>
          </div>
        </div>
      ) : (
        <LoaderSpinner />
      )}
    </>
  );
};

export default ProductCard;
