import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useFetchCartQuery } from "../../redux/api/apiSlice";

const Checkout = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const {
    data: cartInfo,
    isLoading: cartLoading,
    isFetching: cartFetching,
  } = useFetchCartQuery({ userId: userInfo?._id });

  const cartItems = cartInfo?.data?.items;
  console.log(cartItems);

  const formRef = useRef(); // ref to the form

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

  // const totalInBD =

  const formData = [
    {
      label: "full name",
      type: "text",
      name: "fullName",
      defaultValue: userInfo?.fullName,
      required: true,
    },
    {
      label: "address",
      type: "text",
      name: "address",
      required: true,
    },
    {
      label: "city",
      type: "text",
      name: "city",
      required: true,
    },
    {
      label: "postal code",
      type: "text",
      name: "postalCode",
      required: true,
    },
    {
      label: "country",
      type: "text",
      name: "country",
      required: true,
    },
    {
      label: "phone",
      type: "text",
      name: "phone",
      required: true,
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("hola", data);
  };
  return (
    <div className="container mx-auto px-4 grid gap-3 md:gap-10 md:grid-cols-2 items-start font-secondaryFont mt-6">
      {/* address section  */}
      <section className="capitalize w-full mb-12">
        <h2 className="text-xl font-bold mb-2">Provide this information</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
        >
          {/* input fields */}
          {formData.map((data) => (
            <div key={data.label}>
              <label htmlFor={data.name} className="text-gray-700 md:text-lg ">
                {data.label}
              </label>
              <input
                className={`block w-full p-2 md:p-3 md:mt-1 border ${
                  errors?.[data.name]
                    ? "border-red-600"
                    : "border-secondary-color"
                }`}
                {...register(data.name, {
                  required: {
                    value: data.required,
                    message: `${data.label} is required`,
                  },
                })}
                type={data.type}
                id={data.name}
                name={data.name}
                autoComplete="auto"
                defaultValue={data.defaultValue || ""}
              />
              <span className="text-error text-xs">
                {errors?.[data.name]?.message}
              </span>
            </div>
          ))}
        </form>
      </section>
      {/* product view & place order section */}
      <section className="w-full">
        {/* product view  */}
        <div>
          {cartItems?.map((cartItem) => (
            <div
              key={cartItem?.productId}
              className="flex bg-white shadow-lg items-center justify-between gap-2 rounded-sm pr-3 relative mb-2"
            >
              {/* image  */}
              <div className="bg-accent-color/10">
                <img
                  src={cartItem?.image}
                  alt={cartItem?.title}
                  className="w-28 h-auto"
                />
              </div>
              {/* text-part  */}
              <div className="w-full block sm:flex justify-between sm:mr-10 md:block xl:flex">
                <p className="font-bold">{cartItem?.title}</p>
                <p className="font-bold">price: ${cartItem?.salePrice}</p>
              </div>
            </div>
          ))}
        </div>
        {/* checkout section  */}
        <div>
          <div className=" mb-4 bg-white p-3 shadow-lg">
            <div className="flex justify-between items-center">
              <p>subtotal</p>
              <p>${subTotal}</p>
            </div>
            <div className="divider my-1" />

            <div className="flex justify-between">
              <p>shipping</p>
              <p>free</p>
            </div>
            <div className="divider my-1" />

            <div className="flex justify-between">
              <p>coupon discount</p>
              <p>0%</p>
            </div>
            <div className="divider my-1" />

            <div className="flex justify-between mb-4">
              <p>Total</p>
              <p>${total}</p>
            </div>

            <button
              className="btn bg-accent-color hover:bg-on-hover text-white rounded-sm w-full"
              type="button"
              onClick={() => formRef.current.requestSubmit()}
            >
              Order Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
