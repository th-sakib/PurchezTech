import { useCallback, useState } from "react";
import Button from "../../../Components/Button";
import Sidebar from "./Sidebar";
import { useGetAllProductQuery } from "../../../redux/api/apiSlice";
import NoProduct from "../../../Components/NoProduct";
import ProductCard from "../../../Components/ProductCard";

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
      <section className="flex items-center bg-white px-5 py-4">
        <h1 className="text-2xl font-bold capitalize">manage products</h1>
        <Button
          btnHandler={toggleSidebar}
          isLoading={isLoading}
          className="ml-auto"
        >
          Add Product
        </Button>
      </section>

      <section className="mx-5 mb-3 flex flex-wrap justify-center">
        {/* if loading or fetching  */}
        <div className="grid grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {isLoading || isFetching
            ? Array(8)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="card mt-4 w-60 gap-3 rounded-sm rounded-b-lg bg-base-100 shadow-xl"
                  >
                    <div className="skeleton h-44 w-full rounded-none"></div>
                    <div className="overflow-hidden px-2">
                      <div className="float-left w-[70%] overflow-hidden">
                        <div className="skeleton mb-2 h-4 w-28 rounded-none"></div>
                        <div className="skeleton h-4 w-full rounded-none"></div>
                      </div>
                      <div className="float-left w-[30%]">
                        <div className="skeleton mb-2 ml-2 h-4 w-4/5 rounded-none"></div>
                        <div className="skeleton ml-2 h-4 rounded-none"></div>
                      </div>
                    </div>

                    <div className="skeleton h-12 w-full rounded-none rounded-b-lg"></div>
                  </div>
                ))
            : ""}
        </div>

        {/* product view section  */}
        {productData?.length === 0 ? (
          <div className="flex h-[70vh] w-full items-center justify-center">
            <NoProduct />
          </div>
        ) : (
          // ======= product card section =======
          <div className="mt-4 grid grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
        <div className="my-3 flex w-full items-center justify-center">
          {/* pagination */}
          <section className="join">
            {/*<button className="join-item btn btn-sm btn-active">2</button>*/}
            {Array.from(
              { length: productInfo?.data?.totalPages },
              (_, idx) => idx + 1,
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`btn join-item btn-sm ${
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
