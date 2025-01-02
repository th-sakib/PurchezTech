import { useForm } from "react-hook-form";
import ProductImage from "./ProductImage";
import Button from "../../../Components/Button";
import { techProductWithBrands } from "../../../constant.js";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../../redux/api/apiSlice.js";
import { useEffect, useState } from "react";
import { toast } from "../../../lib/sweetAlert/toast.js";
import { useSelector } from "react-redux";
import LoaderSpinner from "../../../Components/LoaderSpinner.jsx";

const AddProductForm = ({
  isOpenSidebar,
  setIsOpenSidebar,
  isEditMode,
  setIsEditMode,
}) => {
  const [imageInfo, setImageInfo] = useState({});
  const [localImg, setLocalImg] = useState([]);

  // from updateSlice
  const productData = useSelector((state) => state.product.product);

  // from apiSlice
  const [createProduct, { isLoading: submitting }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditMode && productData) {
      reset({
        title: productData.title || "",
        description: productData.description || "",
        category: productData.category || "default",
        brand: productData.brand || "default",
        price: productData.price || "",
        salePrice: productData.salePrice || "",
        stock: productData.totalStock || "",
      });
    } else {
      reset({
        title: "",
        description: "",
        category: "default",
        brand: "default",
        price: "",
        salePrice: "",
        stock: "",
      });
    }
  }, [productData, isEditMode, reset]);

  // checking what category option is selected
  const selectCategory = watch("category");
  // using selectedCategory to get brand names => to sync brands with category
  const brandsAccordingCategory = techProductWithBrands[selectCategory] || [];

  const onSubmit = async (data) => {
    try {
      const fullData = {
        title: data.title,
        description: data.description,
        category: data.category,
        brand: data.brand,
        price: data.price,
        salePrice: data.salePrice,
        totalStock: data.stock,
        imageURL: imageInfo.imageURL,
        publicID: imageInfo.publicID,
      };
      const response = await createProduct(fullData).unwrap();
      setIsOpenSidebar(false);
      setImageInfo({});
      setLocalImg([]);
      console.log(response?.data?.message || "product successfully created");
      toast.fire({
        title: "Product has been Created!",
        text: "Product creation successful",
        icon: "success",
      });
      reset();
    } catch (error) {
      console.log(error.message || "Product Creation failed");
    }
  };

  const handleUpdate = async (data) => {
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = data;

    const currentData = {
      id: productData._id,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    };
    try {
      const res = await updateProduct(currentData).unwrap();
      setIsEditMode(false);
      setIsOpenSidebar(false);
      toast.fire({
        title: "Updated Successful",
        text: "Product Updating was successful",
        icon: "success",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* image  */}
      <div className="mb-3">
        {isEditMode ? (
          ""
        ) : (
          <ProductImage
            setImageInfo={setImageInfo}
            imageInfo={imageInfo}
            isOpenSidebar={isOpenSidebar}
            setLocalImg={setLocalImg}
            localImg={localImg}
          />
        )}
      </div>
      <form
        onSubmit={handleSubmit(isEditMode ? handleUpdate : onSubmit)}
        encType="multipart/form-data"
      >
        {/* title */}
        <div className="relative group h-12 mb-10">
          <label className="font-bold" htmlFor="title">
            Title
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
              minLength: {
                value: 3,
                message: "Minimum 3 character",
              },
            })}
            type="text"
            name="title"
            id="title"
            placeholder="Enter product title"
          />
          <p className="text-red-600 text-sm">{errors?.title?.message}</p>
        </div>

        {/* description */}
        <div className="relative group h-8 mb-[83.2px]">
          <label className="font-bold" htmlFor="description">
            Description
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
              minLength: {
                value: 3,
                message: "Minimum 3 character",
              },
            })}
            type="text"
            name="description"
            id="description"
            placeholder="Enter product description"
          />
          <p className="text-red-600 text-sm -mt-1">
            {errors?.description?.message}
          </p>
        </div>

        {/* category  */}
        <div className="relative group h-8 mb-14">
          <label className="font-bold" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            id="category"
            defaultValue="default"
            {...register("category", {
              validate: (value) =>
                value !== "default" || "Category is required",
            })}
            className="select select-bordered w-full max-w-xs"
          >
            {/* Placeholder option */}
            <option disabled value="default" className="capitalize">
              Select category
            </option>

            {/* Dynamic options */}
            {Object.keys(techProductWithBrands).map((key) => (
              <option key={key} value={key} className="capitalize">
                {key}
              </option>
            ))}
          </select>

          {/* Error message */}
          <p className="text-red-600 text-sm">{errors?.category?.message}</p>
        </div>

        {/* brand  */}
        <div className="relative group h-8 mb-14">
          <label className="font-bold" htmlFor="brand">
            Brand
          </label>
          <select
            name="brand"
            id="brand"
            defaultValue="default"
            {...register("brand", {
              validate: (value) => value !== "default" || "Brand is required",
            })}
            className="select select-bordered w-full max-w-xs"
            disabled={!brandsAccordingCategory.length}
          >
            {/* Placeholder option */}
            <option disabled value="default" className="capitalize">
              Select Brand
            </option>

            {/* Dynamic options */}
            {brandsAccordingCategory.map((brand, idx) => (
              <option key={idx}>{brand}</option>
            ))}
          </select>

          {/* Error message */}
          <p className="text-red-600 text-sm">{errors?.brand?.message}</p>
        </div>

        {/* price  */}
        <div className="relative group h-12 mb-10">
          <label className="font-bold" htmlFor="price">
            Price
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            {...register("price", {
              required: {
                value: true,
                message: "Price is required",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Price takes only integer number",
              },
              min: {
                value: 0,
                message: "Price can't be negative",
              },
            })}
            type="text"
            name="price"
            id="price"
            placeholder="Enter product price"
          />
          <p className="text-red-600 text-sm">{errors?.price?.message}</p>
        </div>

        {/* Sale price  */}
        <div className="relative group h-12 mb-12">
          <label className="font-bold" htmlFor="salePrice">
            Sale Price
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            {...register("salePrice", {
              required: {
                value: true,
                message: "Sale Price is required",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Sale price takes only integer number",
              },
              min: {
                value: 0,
                message: "Sale price can't be negative",
              },
            })}
            type="text"
            name="salePrice"
            id="salePrice"
            placeholder="Enter product salePrice"
          />
          <p className="text-red-600 text-sm">{errors?.salePrice?.message}</p>
        </div>

        {/* Total Stock  */}
        <div className="relative group h-12 mb-12">
          <label className="font-bold" htmlFor="stock">
            Total Stock
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            {...register("stock", {
              required: {
                value: true,
                message: "Total stock is required",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Total stock takes only integer number",
              },
              min: {
                value: 0,
                message: "Total stock can't be negative",
              },
            })}
            type="text"
            name="stock"
            id="stock"
            placeholder="Enter product stock"
          />
          <p className="text-red-600 text-sm">{errors?.stock?.message}</p>
        </div>

        {/* buttons */}
        {isEditMode ? (
          <Button btnType="submit" className="w-full">
            {updating ? (
              <LoaderSpinner className="loading-md" />
            ) : (
              "Update Product"
            )}
          </Button>
        ) : (
          <Button btnType="submit" className="w-full">
            {submitting ? <LoaderSpinner /> : "Create Product"}
          </Button>
        )}
      </form>
    </>
  );
};

export default AddProductForm;
