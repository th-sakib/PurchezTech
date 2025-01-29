import React from "react";
import { useParams } from "react-router-dom";
import { useFetchIndividualOrderQuery } from "../redux/api/apiSlice";
import { TbCurrencyTaka } from "react-icons/tb";

export default function OrderDetails() {
  const { id } = useParams();

  const { data: orderRes, isFetching } = useFetchIndividualOrderQuery({
    orderId: id,
  });

  const order = orderRes?.data;

  return (
    <div className="m-4 min-h-screen">
      <section className="w-fit">
        <h1 className="text-xl font-normal sm:text-2xl md:text-3xl md:font-semibold">
          Order #{id}
        </h1>
      </section>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* left side */}
        <section className="mt-4">
          <OrderStatus order={order} />
          <div>
            <AllItems order={order} />
          </div>
        </section>
        {/* right side  */}
        <section className="mt-4">
          <div className="flex flex-col gap-5">
            <Summary order={order} />

            <ShippingAddress order={order} />
            <PaymentMethods order={order} />
          </div>
        </section>
      </div>
    </div>
  );
}

function OrderStatus({ order }) {
  const tagColor =
    order?.orderStatus === "Cancelled"
      ? "text-error"
      : order?.orderStatus === "Processing"
        ? "text-accent"
        : order?.orderStatus === "Delivered"
          ? "text-success"
          : "text-success";

  return (
    <div className="w-full space-y-1 rounded-lg bg-background-color px-4 py-2">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold">Order Status</h2>
        <div className="font-bold">
          <div className={`badge badge-outline ${tagColor}`}>
            {order?.orderStatus}
          </div>
        </div>
      </div>
    </div>
  );
}

function AllItems({ order }) {
  return (
    <div className="mt-4 rounded-lg bg-background-color p-3">
      {/* header part of all item section  */}
      <div className="mb-6 mt-3 flex items-center justify-between rounded-lg bg-background-color/50 px-4 py-0">
        <h2 className="text-lg font-bold">All Items</h2>
        <div className="font-bold">Items: {order?.orderItems?.length}</div>
      </div>
      <div className="">
        {order?.orderItems?.map((orderItem) => (
          // order Card
          <div
            key={orderItem?._id}
            className="grid grid-cols-6 items-center gap-8 rounded-lg p-2 odd:bg-white"
          >
            <OrderItemCard orderItem={orderItem} />
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderItemCard({ orderItem }) {
  return (
    <>
      <div className="h-14 w-14">
        <img
          src={orderItem?.image}
          alt={`Product ${orderItem?.name}`}
          className="h-full w-fit"
        />
      </div>
      <div className="col-span-3">
        <p className="text-sm text-gray-500">product name</p>
        <h2 className="text-sm font-bold">{orderItem?.name}</h2>
      </div>
      <div className="col-span-1 text-gray-500">
        <p className="text-sm">quantity</p>
        <h2 className="text-center text-sm font-bold text-black">
          {orderItem?.quantity}
        </h2>
      </div>
      <div className="">
        <p className="text-sm text-gray-500">price</p>
        <h2 className="text-sm font-bold text-black">${orderItem?.price}</h2>
      </div>
    </>
  );
}

function Summary({ order }) {
  return (
    <>
      <div className="w-full space-y-1 rounded-lg bg-background-color px-6 py-4">
        <h2 className="font-bold"> Summary</h2>
        <div className="flex gap-6">
          <p className="w-16 shrink-0 text-gray-500">Order ID</p>
          <p className="font-bold">#{order?._id}</p>
        </div>
        <div className="flex gap-6">
          <p className="w-16 shrink-0 text-gray-500">Date</p>
          <p className="">{order?.paymentDetails?.tranDate}</p>
        </div>
        <div className="flex gap-6">
          <p className="w-16 shrink-0 text-gray-500">Total</p>
          <p className="flex items-center text-additional-color">
            <TbCurrencyTaka className="text-lg" />
            {order?.totalPrice}
          </p>
        </div>
      </div>
    </>
  );
}

function ShippingAddress({ order }) {
  return (
    <section className="w-full space-y-1 rounded-lg bg-background-color px-6 py-4">
      <h3 className="font-bold">Shipping Address</h3>
      <p className="text-gray-500">
        {order?.addressInfo?.address}, {order?.addressInfo?.country} - postal:{" "}
        {order?.addressInfo?.postalCode}
      </p>
    </section>
  );
}

function PaymentMethods({ order }) {
  return (
    <>
      <div className="w-full space-y-1 rounded-lg bg-background-color px-6 py-4">
        <h2 className="font-bold"> PaymentDetails</h2>
        <div className="flex gap-6">
          <p className="w-20 shrink-0 text-gray-500">Card Issuer</p>
          <p className="font-bold">{order?.paymentDetails?.cardIssuer}</p>
        </div>
        <div className="flex gap-6">
          <p className="w-20 shrink-0 text-gray-500">Card Brand</p>
          <p className="font-bold">{order?.paymentDetails?.cardBrand}</p>
        </div>
      </div>
    </>
  );
}
