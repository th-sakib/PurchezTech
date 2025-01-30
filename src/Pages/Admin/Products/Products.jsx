import { useCallback, useState } from "react";
import Button from "../../../Components/Button";
import Sidebar from "./Sidebar";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../redux/features/common/productSlice";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import { FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
import { toast } from "../../../lib/sweetAlert/toast";

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

      <ShowProducts
        productData={productData}
        setIsEditMode={setIsEditMode}
        setIsOpenSidebar={setIsOpenSidebar}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <Pagination productInfo={productInfo} page={page} setPage={setPage} />

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

function ShowProducts({
  productData,
  setIsOpenSidebar,
  setIsEditMode,
  isLoading,
  isFetching,
}) {
  const dispatch = useDispatch();
  const [deleteProduct] = useDeleteProductMutation();
  // ====Edit handler====
  function handleEdit(data) {
    setIsOpenSidebar(true);
    setIsEditMode(true);
    dispatch(setProduct(data));
  }

  // ====Delete handler====
  async function handleDelete(product) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(product._id);
          toast.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting product:", error.message);
          toast.fire({
            title: "Error!",
            text: "Failed to delete the product.",
            icon: "error",
          });
        }
      }
    });
  }

  // loading skeleton
  if (isLoading || isFetching) {
    return (
      <div className="min-h-[80vh]overflow-x-auto relative m-4 mr-4 overflow-y-hidden rounded-lg bg-white capitalize">
        <table className="min-w-full border-separate border-spacing-y-2">
          {/* Table Head */}
          <thead>
            <tr>
              {["Product", "Category", "Brand", "Price", "Action"].map(
                (heading, idx) => (
                  <th key={idx} className="py-2 text-left text-gray-500">
                    {heading}
                  </th>
                ),
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="animate-pulse bg-gray-100">
                {/* Product Column */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-md bg-gray-300"></div>
                    <div>
                      <div className="mb-1 h-4 w-32 rounded bg-gray-300"></div>
                      <div className="h-3 w-48 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </td>
                {/* Category */}
                <td className="px-4 py-3">
                  <div className="h-4 w-20 rounded bg-gray-300"></div>
                </td>
                {/* Brand */}
                <td className="px-4 py-3">
                  <div className="h-4 w-24 rounded bg-gray-300"></div>
                </td>
                {/* Price */}
                <td className="px-4 py-3">
                  <div className="h-4 w-16 rounded bg-gray-300"></div>
                </td>
                {/* Action Button */}
                <td className="flex items-center justify-start gap-2 px-4 py-5">
                  <div className="h-8 w-20 rounded bg-gray-300"></div>
                  <div className="h-8 w-10 rounded bg-gray-300"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div className="">
        <div className="min-h-[80vh]overflow-x-auto m-4 mr-4 overflow-y-hidden rounded-lg bg-white capitalize">
          <table className="table">
            {/* head */}
            <thead className="">
              <tr>
                <th>product</th>
                <th>category</th>
                <th>brand</th>
                <th>price</th>
                <th>action</th>
              </tr>
            </thead>
            {/* body  */}
            <tbody>
              {productData?.map((item) => (
                <tr key={item?._id} className="">
                  {/* product image & title column */}
                  <td className="w-fit">
                    <div className="flex w-fit items-center gap-3">
                      <div className="shrink-0">
                        <div className="">
                          <img src={item?.imageURL} alt="" className="w-12" />
                        </div>
                      </div>
                      <div className="max-w-48">
                        <div className="font-bold">{item?.title}</div>
                        <div
                          className="line-clamp-2 text-pretty text-xs text-faded-text"
                          title={item?.description}
                        >
                          {item?.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* =============================== */}
                  <td>{item?.category}</td>
                  <td>{item?.brand}</td>
                  <td>${item?.salePrice}</td>
                  {/* button */}
                  <td>
                    <div className="flex items-center justify-start gap-3">
                      <Button
                        btnHandler={() => handleEdit(item)}
                        className={"rounded-lg"}
                      >
                        Edit
                      </Button>
                      <div
                        className="group/delete flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-accent-color"
                        onClick={() => handleDelete(item)}
                      >
                        <MdDelete className="text-2xl text-white group-hover/delete:text-red-600" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Pagination({ productInfo, page, setPage }) {
  // handlers
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < productInfo?.data?.totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <div>
      {/* pagination div */}
      {productInfo?.data?.totalProducts > 12 ? (
        <div className="mb-3 flex w-full items-center justify-center">
          {/* pagination */}
          <section className="join flex items-center justify-center rounded-sm">
            {/* prev button  */}
            <button
              className={`flex h-full w-full items-center justify-center border border-accent-color px-2 py-1 font-bold shadow-md hover:bg-[#6daef405]/50`}
              onClick={() => handlePrev()}
            >
              <HiArrowSmLeft />
            </button>
            {productInfo?.data?.totalProducts > 12 &&
              Array.from(
                { length: productInfo?.data?.totalPages },
                (_, idx) => idx + 1,
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`rounded-sm border border-accent-color px-2 font-bold shadow-md ${
                    page === pageNumber
                      ? "bg-accent-color text-white"
                      : "bg-white hover:bg-[#6daef405]/50"
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            {/* next button  */}
            <button
              className={`flex h-full w-full items-center justify-center border border-accent-color px-2 py-1 font-bold shadow-md hover:bg-[#6daef405]/50`}
              onClick={() => handleNext()}
            >
              <HiArrowSmRight />
            </button>
          </section>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Products;
