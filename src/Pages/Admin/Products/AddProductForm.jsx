import { useForm } from "react-hook-form";
import ProductImage from "./ProductImage";
import Button from "../../../Components/Button";
import {
  useCreateProductMutation,
  useUploadProductMutation,
} from "../../../redux/api/apiSlice.js";

const AddProductForm = () => {
  const techProductWithBrands = {
    Laptops: ["Dell", "HP", "Apple", "Lenovo", "ASUS", "Acer", "MSI", "Razer"],
    Desktops: [
      "Dell",
      "HP",
      "Lenovo",
      "Apple",
      "ASUS",
      "Acer",
      "CyberPowerPC",
      "iBUYPOWER",
    ],
    Smartphones: [
      "Apple",
      "Samsung",
      "Google",
      "OnePlus",
      "Xiaomi",
      "Huawei",
      "Oppo",
      "Vivo",
    ],
    Tablets: ["Apple", "Samsung", "Microsoft", "Lenovo", "Huawei", "Amazon"],
    Monitors: ["Dell", "Samsung", "LG", "ASUS", "Acer", "BenQ", "HP", "MSI"],
    "Printers & Scanners": [
      "HP",
      "Canon",
      "Epson",
      "Brother",
      "Xerox",
      "Lexmark",
    ],
    "Networking Equipment": [
      "Netgear",
      "TP-Link",
      "Cisco",
      "Asus",
      "Linksys",
      "Ubiquiti",
      "D-Link",
    ],
    "Storage Devices": [
      "Western Digital",
      "Seagate",
      "SanDisk",
      "Kingston",
      "Samsung",
      "Crucial",
      "Toshiba",
    ],
    "PC Components": [
      "Intel",
      "AMD",
      "NVIDIA",
      "Corsair",
      "MSI",
      "ASUS",
      "Gigabyte",
      "EVGA",
    ],
    "Wearable Devices": [
      "Apple",
      "Fitbit",
      "Samsung",
      "Garmin",
      "Xiaomi",
      "Huawei",
    ],
    "Smart Home Devices": [
      "Google",
      "Amazon",
      "Apple",
      "Philips Hue",
      "Ring",
      "Nest",
      "TP-Link",
    ],
    "Gaming Consoles": ["Sony", "Microsoft", "Nintendo", "Steam"],
    "Audio Equipment": [
      "Bose",
      "Sony",
      "JBL",
      "Sennheiser",
      "Beats",
      "Logitech",
      "Audio-Technica",
    ],
    "Camera & Photography": [
      "Canon",
      "Nikon",
      "Sony",
      "Fujifilm",
      "Olympus",
      "GoPro",
    ],
    Drones: ["DJI", "Autel Robotics", "Parrot", "Skydio", "Holy Stone"],
    "VR & AR Devices": ["Meta", "Sony", "HTC", "Valve", "Microsoft", "Pico"],
    "Software & Subscriptions": [
      "Microsoft",
      "Adobe",
      "Apple",
      "Google",
      "Autodesk",
      "Zoom",
    ],
    "Charging Accessories": [
      "Anker",
      "Belkin",
      "Apple",
      "Samsung",
      "RAVPower",
      "Mophie",
    ],
    "Keyboards & Mice": [
      "Logitech",
      "Razer",
      "Corsair",
      "SteelSeries",
      "Microsoft",
      "Apple",
    ],
    "Graphics Tablets": ["Wacom", "Huion", "XP-Pen", "Gaomon", "UGEE"],
    Projectors: ["Epson", "BenQ", "Optoma", "ViewSonic", "LG", "Sony"],
    "Power Supplies & UPS": [
      "APC",
      "CyberPower",
      "EVGA",
      "Corsair",
      "Seasonic",
      "Cooler Master",
    ],
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  // getting post methods from api slice
  const [uploadProduct, { isLoading: uploading }] = useUploadProductMutation();
  const [createProduct, { isLoading: submitting }] = useCreateProductMutation();

  // checking what category option is selected
  const selectedCategy = watch("category");
  // using selectedCategory to get brand names => to sync brands with category
  const brandsAccordingCategory = techProductWithBrands[selectedCategy] || [];

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productImage", data.productImage);

      const imageRes = await uploadProduct(formData).unwrap();
      console.log(imageRes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* image  */}
      <div className="mb-3">
        <ProductImage
          register={register}
          errors={errors}
          setValue={setValue}
          trigger={trigger}
          watch={watch}
        />
      </div>

      {/* title */}
      <div className="relative group h-12 mb-10">
        <label htmlFor="title">Title</label>
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
      <div className="relative group h-8 mb-[5.2rem]">
        <label htmlFor="description">Description</label>
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
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          defaultValue="default"
          {...register("category", {
            validate: (value) => value !== "default" || "Category is required",
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
        <label htmlFor="brand">Brand</label>
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
        <label htmlFor="price">Price</label>
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
        <label htmlFor="salePrice">Sale Price</label>
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
        <label htmlFor="stock">Total Stock</label>
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

      <Button btnType="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
};

export default AddProductForm;
