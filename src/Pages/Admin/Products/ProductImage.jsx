import { useDropzone } from "react-dropzone";
import { FiDownload } from "react-icons/fi";
import { GiCrossMark } from "react-icons/gi";
import Swal from "sweetalert2";
import { useUploadProductMutation } from "../../../redux/api/apiSlice.js";
import { memo, useCallback, useEffect, useState } from "react";
import LoaderSpinner from "../../../Components/LoaderSpinner.jsx";

const ProductImage = memo(({ setImageInfo, imageInfo }) => {
  const [localImg, setLocalImg] = useState([]);

  const [uploadProduct, { isLoading: uploading }] = useUploadProductMutation();

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles?.length > 0) {
        Swal.fire({
          title: rejectedFiles[0].errors[0].message,
          text: "Select one image, multiple files are not granted!",
        });
        return;
      }

      if (
        rejectedFiles.length === 0 &&
        (!acceptedFiles || acceptedFiles.length === 0)
      ) {
        console.log("No file is selected");
        return;
      }

      // getting the file details locally and the url too
      setLocalImg((prevFile) => [
        ...prevFile,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);

      // console.log("file", file);

      const formData = new FormData();
      formData.append("productImage", acceptedFiles[0]); // Since maxFiles=1

      try {
        const res = await uploadProduct(formData).unwrap();
        console.log("Image upload success");

        const imgInfo = {
          imageURL: res.data.secure_url,
          publicID: res.data.public_id,
        };

        setImageInfo(imgInfo);
      } catch (error) {
        console.error("Image upload failed:", error?.data?.message);
        Swal.fire({
          title: "Upload Failed",
          text: error?.data?.message || "An error occurred while uploading.",
          icon: "error",
        });
      }
    },
    [uploadProduct, localImg]
  );

  const {
    acceptedFiles,
    rejectedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    disabled: uploading,
    useFsAccessApi: true,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDrop,
  });

  function handleDelete() {
    setLocalImg([]);
    setImageInfo({});
  }

  // styling border color
  const borderColor = () => {
    if (isFocused && acceptedFiles.length === 0 && !isDragReject) {
      return "border-gray-500";
    } else if (isDragAccept) {
      return "border-green-500";
    } else if (isDragReject) {
      return "border-red-500";
    } else if (acceptedFiles.length !== 0) {
      return "border-accent-color";
    } else {
      return "border-gray-300";
    }
  };

  return (
    <div>
      <h4 className="text-base font-bold">Upload Image</h4>
      <div
        {...getRootProps()}
        className={`cursor-pointer h-32 rounded-lg w-full border-2 border-dashed ${borderColor()} flex justify-center items-center transition-all duration-300`}
      >
        <input {...getInputProps()} />

        {/* middle text and icon div  */}
        {uploading ? (
          <div>
            <LoaderSpinner />
          </div>
        ) : (
          <div className="text-center flex flex-col justify-center items-center">
            <FiDownload className="text-4xl" />
            {isDragActive ? (
              <>
                <span className="text-xl font-bold">Drag the image here</span>
              </>
            ) : (
              <>
                <span className="text-xl font-bold">Drag & Drop</span>
                <span>Or Select Images</span>
              </>
            )}
          </div>
        )}
      </div>
      {/* local file div */}
      {localImg.length > 0 &&
        localImg.map((file, idx) => (
          <div
            key={idx}
            className="text-center flex flex-col justify-center items-center absolute h-24 w-full bg-background-color rounded-s-lg right-full top-14"
          >
            <div>
              <img src={file.preview} alt="previewed file" className="h-14" />
              <GiCrossMark
                className="absolute top-1 right-2 hover:text-accent-color cursor-pointer"
                onClick={handleDelete}
              />
            </div>
          </div>
        ))}
    </div>
  );
});

export default ProductImage;
{
  /*  */
}
