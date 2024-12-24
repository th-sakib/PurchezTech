import { useCallback, useState } from "react";
import Button from "../../../Components/Button";
import Sidebar from "./Sidebar";
import { useGetAllProductQuery } from "../../../redux/api/apiSlice";
import NoProduct from "../../../Components/NoProduct";
import ProductCard from "../../../Components/ProductCard";
import { useSelector } from "react-redux";
import { TbArrowsSort } from "react-icons/tb";

const Products = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  // fetching product to view
  const {
    data: productInfo,
    isLoading,
    isFetching,
    isUninitialized,
  } = useGetAllProductQuery({
    category: "default",
    brand: "",
    sortByPrice: "",
    sortByDate: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    page,
    limit,
  });

  const productData = productInfo?.data?.listOfProduct; // product data from server

  if (isUninitialized) {
    return <p>Waiting to fetch data...</p>;
  }

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
    setIsEditMode(false);
  };

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return (
    <div className="">
      {/* title section */}
      <section className="flex mt-4 mx-5 items-center">
        <h1 className="capitalize text-2xl font-bold">manage products</h1>
        <Button
          btnHandler={toggleSidebar}
          isLoading={isLoading}
          className="ml-auto"
        >
          Add Product
        </Button>
      </section>

      <section className="flex mx-5 flex-wrap justify-center mb-3">
        {/* if loading or fetching  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-5">
          {isLoading || isFetching
            ? Array(8)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="card bg-base-100 shadow-xl w-60 gap-3 rounded-sm rounded-b-lg mt-4"
                  >
                    <div className="skeleton h-44 w-full rounded-none"></div>
                    <div className="px-2 overflow-hidden ">
                      <div className="w-[70%] float-left overflow-hidden">
                        <div className="skeleton h-4 w-28 mb-2 rounded-none"></div>
                        <div className="skeleton h-4 w-full rounded-none"></div>
                      </div>
                      <div className="w-[30%] float-left">
                        <div className="skeleton w-4/5 h-4 mb-2 rounded-none ml-2"></div>
                        <div className="skeleton h-4 rounded-none ml-2"></div>
                      </div>
                    </div>

                    <div className="skeleton h-12 rounded-none w-full rounded-b-lg"></div>
                  </div>
                ))
            : ""}
        </div>

        {/* product view section  */}
        {productData?.length === 0 ? (
          <div className="flex justify-center items-center w-full h-[70vh]">
            <NoProduct />
          </div>
        ) : (
          // ======= product card section =======
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-center mt-4">
            {productData?.map((product) => (
              <div key={product._id}>
                <ProductCard
                  isLoading={isLoading}
                  setIsEditMode={setIsEditMode}
                  setIsOpenSidebar={setIsOpenSidebar}
                  product={product}
                />
              </div>
            ))}
          </div>
        )}
        {/* pagination div */}
        <div className="w-full flex justify-center items-center my-3">
          {/* pagination */}
          <section className="join">
            {/*<button className="join-item btn btn-sm btn-active">2</button>*/}
            {Array.from(
              { length: productInfo?.data?.totalPages },
              (_, idx) => idx + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`join-item btn btn-sm ${
                  page === pageNumber ? "btn-active" : ""
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </section>
        </div>
      </section>
      {/* add product functionality is inside sidebar  */}
      <Sidebar
        setIsEditMode={setIsEditMode}
        isEditMode={isEditMode}
        isOpenSidebar={isOpenSidebar}
        toggleSidebar={toggleSidebar}
        setIsOpenSidebar={setIsOpenSidebar}
      />
    </div>
  );
};

export default Products;
