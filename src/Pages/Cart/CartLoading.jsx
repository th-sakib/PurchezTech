const CartLoading = () => {
  return (
    <div>
      <div className="flex md:w-[40vw] items-center gap-4 mb-4">
        <div className="skeleton rounded-sm h-32 w-32"></div>
        <div className="space-y-3">
          <div className="skeleton h-4 w-64"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CartLoading;
