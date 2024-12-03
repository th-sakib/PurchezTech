import { useState } from "react";
import Button from "../../../Components/Button";
import Sidebar from "./Sidebar";
import { useGetAllProductQuery } from "../../../redux/api/apiSlice";
import NoProduct from "../../../Components/NoProduct";

const Products = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const {
    data: productData,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetAllProductQuery();

  if (isUninitialized) {
    return <p>Waiting to fetch data...</p>;
  }

  if (isLoading || isFetching) {
    return <p> Loading...</p>;
  }

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  // brand: "asus";
  // category: "monitors";
  // createdAt: "2024-11-29T18:06:03.260Z";
  // description: "asdf";
  // imageURL: "http://res.cloudinary.com/dgw9fuux6/image/upload/v1732903561/purchezTech/products/wqlaahsslogue3ekawuz.png";
  // price: 900;
  // salePrice: 3;
  // title: "";
  // totalStock: 3;
  // updatedAt: "2024-11-29T18:06:03.260Z";
  // __v: 0;
  // _id: "674a028bf2d258abcd8303bc";

  return (
    <div className="flex mt-4">
      {productData?.data.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[70vh]">
          <NoProduct />
        </div>
      ) : (
        productData?.data.map((product, idx) => (
          <div key={product._id}>{product.title}</div>
        ))
      )}
      <Button btnHandler={toggleSidebar} className="ml-auto mr-8">
        Add Product
      </Button>
      <Sidebar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Products;
