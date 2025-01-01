const Order = () => {
  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-6 ml-4 md:text-center text-gray-700">
        My Orders
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>product image</td>
              <td>product title</td>
              <td>$99</td>
              <td>1</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
