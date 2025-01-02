import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  useCreateOrderMutation,
  useFetchCartQuery,
} from "../../redux/api/apiSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [getRates, setGetRates] = useState();
  const userInfo = useSelector((state) => state.user.userInfo);

  const {
    data: cartInfo,
    isLoading: cartLoading,
    isFetching: cartFetching,
  } = useFetchCartQuery({ userId: userInfo?._id });

  const [createOrder, { isLoading: orderIsLoading }] = useCreateOrderMutation();

  const cartItems = cartInfo?.data?.items;

  const formRef = useRef(); // ref to the form
  const navigate = useNavigate();

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

  // getting exchange rates
  async function fetchExchangeRates() {
    const url =
      "https://v6.exchangerate-api.com/v6/069f4c363f25d47f4447d358/latest/USD";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data.conversion_rates;
    } catch (error) {
      console.error("Error fetching exchange rates:", error.message);
    }
  }

  useEffect(() => {
    async function getRates() {
      const fetchedRates = await fetchExchangeRates();
      setGetRates(fetchedRates);
    }
    getRates();
  }, []);

  const BDExchangeRate = getRates?.BDT || 100;
  const totalInBD = (BDExchangeRate * total).toFixed(2);

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

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      totalAmount: totalInBD,
      userId: userInfo?._id,
      cartItems,
    };

    try {
      const res = await createOrder(newData).unwrap();
      if (res.statusCode === 200) {
        window.location.href = res?.data?.url;
      }
    } catch (error) {
      console.log(error);
    }
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

            <div className="flex justify-between">
              <p>Total</p>
              <p>${total}</p>
            </div>
            <div className="divider my-1" />

            <div className="flex justify-between mb-4">
              <p>In Bangladesh</p>
              <p>BDT {totalInBD}</p>
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
