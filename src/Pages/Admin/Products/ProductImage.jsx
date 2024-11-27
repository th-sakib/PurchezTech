import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa6";
import { MdBrokenImage } from "react-icons/md";

const ProductImage = ({ register, errors, setValue, trigger, watch }) => {
  const [draggedIn, setDraggedIn] = useState(false);
  const fileInputRef = useRef(null);

  const watchFile = watch("productImage") || false;

  function handleOnDragOver(e) {
    e.preventDefault();
    setDraggedIn(true);
  }

  function handleOnDragLeave(e) {
    e.preventDefault();
    setDraggedIn(false);
  }

  function hadnleOnDrop(e) {
    e.preventDefault();
    setDraggedIn(false);
    const dropFile = e.dataTransfer.files?.[0];

    // Update the hidden input field's files
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(dropFile);
    fileInputRef.current.files = dataTransfer.files;

    if (dropFile) {
      setValue("productImage", dropFile, { shouldValidate: true });
      trigger("productImage");
    }
  }

  function handleOnChange(e) {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setValue("productImage", selectedFile, { shouldValidate: true });
      trigger("productImage");
    }
  }

  return (
    <>
      <h3 className="text-xl font-bold">Upload Image</h3>

      {/* the drag and drop input  */}
      <label
        htmlFor="productImage"
        className={`w-full h-32 rounded border-2 border-dashed flex flex-col justify-center items-center mt-2 text-gray-600 cursor-pointer relative ${
          errors?.productImage && "border-red-600"
        } ${draggedIn && "border-accent-color"} ${
          watchFile & !errors?.productImage && "border-green-700"
        } "border-gray-600"
        }`}
        onDragOver={handleOnDragOver}
        onDragLeave={handleOnDragLeave}
        onDrop={hadnleOnDrop}
      >
        <input
          {...register("productImage", {
            required: {
              value: true,
            },
            validate: (value) =>
              value?.size <= 4 * 1024 * 1024 || "File should be less than 4MB",
          })}
          type="file"
          id="productImage"
          name="productImage"
          className="hidden"
          ref={fileInputRef}
          onChange={handleOnChange}
        />
        <IoCloudUploadOutline className="text-4xl" />
        <p className="text-center text-2xl font-bold">Drag and Drop</p>
        <span className="text-sm font-normal">Or Upload a photo</span>

        {/* the image showing */}
        {watchFile && (
          <div
            className={`absolute top-0 right-[106%] bg-white p-5 rounded-md border ${
              errors?.productImage ? "border-red-600" : "border-green-700"
            } flex flex-col justify-start items-center w-full`}
          >
            <div className="flex gap-2 justify-center items-center">
              {errors?.productImage ? <MdBrokenImage /> : <FaFileImage />}
              <span>{watchFile?.name}</span>
            </div>

            <div className="block text-xs">
              size: {(watchFile?.size / 1024).toFixed(1)} KB
            </div>
          </div>
        )}
      </label>
      <p className="text-red-700 text-xs">{errors?.productImage?.message}</p>
    </>
  );
};

export default ProductImage;
