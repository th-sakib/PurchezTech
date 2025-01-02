import { useDropzone } from "react-dropzone";
import { FiDownload } from "react-icons/fi";
import { GiCrossMark } from "react-icons/gi";
import { IoCloudDone } from "react-icons/io5";
import Swal from "sweetalert2";
import { memo, useCallback, useEffect, useState } from "react";
import LoaderSpinner from "../../../Components/LoaderSpinner";
import { useDeleteUploadedProductMutation } from "../../../redux/api/apiSlice";
import { toast } from "../../../lib/sweetAlert/toast";

const ProductImage = memo(
  ({ setImageInfo, imageInfo, isOpenSidebar, localImg, setLocalImg }) => {
    const [uploading, setUploading] = useState(false);
    const [progressed, setProgressed] = useState(0);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
      async function deleteCloud() {
        try {
          const res = await deleteUploadedProduct(imageInfo?.publicID);
          setLocalImg([]);
          setImageInfo({});
        } catch (error) {
          console.log(error.data.message);
        }
      }

      if (Object.keys(imageInfo).length !== 0) {
        deleteCloud();
      }
    }, []);

    const [deleteUploadedProduct, { isLoading: deleting }] =
      useDeleteUploadedProductMutation();

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

        const formData = new FormData();
        formData.append("productImage", acceptedFiles[0]); // Since maxFiles=1

        const xhr = new XMLHttpRequest();

        xhr.withCredentials = true;

        // upload functionality
        xhr.open(
          "POST",
          "http://localhost:5000/api/v1/admin/upload-product",
          true
        );

        // calculating percentage of uploaded data
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            // The calculation
            const completedPercentage = Math.round(
              (event.loaded / event.total) * 100
            );

            setProgressed(completedPercentage);
            if (completedPercentage === 100) {
              setProcessing(true);
            }
          }
        });

        xhr.onload = () => {
          try {
            const response = JSON.parse(xhr.responseText);

            if (xhr.status === 201) {
              console.log("Upload successful: ", response.message);
              setProgressed(0); // after completion the progress bar will become 0
              setProcessing(false);

              // retrieving necessary info from the response
              const imageData = {
                imageURL: response?.data?.secure_url,
                publicID: response?.data?.public_id,
              };

              setImageInfo(imageData);
              // getting the file details locally and the url too
              setLocalImg((prevFile) => [
                ...prevFile,
                ...acceptedFiles.map((file) =>
                  Object.assign(file, { preview: URL.createObjectURL(file) })
                ),
              ]);
            } else {
              console.log("Upload failed", response.message);
              if (response.message === "Uploading in cloudinary problem") {
                toast.fire({
                  title: response?.data[0].message,
                  icon: "warning",
                  timer: 4000,
                });
              }
              setLocalImg([]);
              setUploading(false);
              setProgressed(0);
              setProcessing(false);
            }
          } catch (error) {
            console.log("error in onload: ", error);
            setProcessing(false);
            setUploading(false);
            setProgressed(0);
          }
        };

        xhr.onloadstart = () => {
          setUploading(true);
          setProgressed(0);
        };

        xhr.onloadend = () => {
          setUploading(false);
          setProgressed(0);
          setProcessing(false);
        };

        xhr.onerror = () => {
          console.log("An error occurs when the file was uploading");
        };
        xhr.send(formData);
      },
      [localImg]
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
      disabled: uploading || Object.keys(imageInfo).length !== 0,
      useFsAccessApi: true,
      accept: {
        "image/png": [],
        "image/jpeg": [],
        "image/jpg": [],
        "image/webp": [],
      },
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024,
      onDrop,
    });

    const handleDelete = async () => {
      try {
        console.log(imageInfo.publicID);
        const res = await deleteUploadedProduct(imageInfo?.publicID);
        console.log(res.data.message);
        setLocalImg([]);
        setImageInfo({});
      } catch (error) {
        console.log(error.data.message);
      }
    };

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

    // mb, kb or byte
    const convertSize = (fileSize) => {
      if (fileSize <= 1024) {
        return fileSize + "B";
      }

      if ((fileSize > 1024) & (fileSize < 1024 * 1024)) {
        const mutatedFileSize = fileSize / 1024;
        return mutatedFileSize.toFixed(2) + "KB";
      } else {
        const mutatedFileSize = fileSize / 1024 / 1024;
        return mutatedFileSize.toFixed(2) + "MB";
      }
    };

    return (
      <div>
        <h4 className="text-base font-bold">Upload Image</h4>
        <div
          {...getRootProps()}
          className={`cursor-pointer h-32 rounded-lg w-full border-2 border-dashed ${borderColor()} flex justify-center items-center transition-all duration-300 ${
            deleting ||
            processing ||
            uploading ||
            Object.keys(imageInfo).length !== 0
              ? "bg-gray-300 cursor-no-drop"
              : ""
          }`}
        >
          <input {...getInputProps()} />

          {/* middle text and icon div  */}
          {(progressed > 0) & !processing ? (
            <div>
              {/* progress bar  */}
              <div
                className="radial-progress"
                style={{ "--value": progressed }}
                role="progressbar"
              >
                {progressed}%
              </div>
            </div>
          ) : (Object.keys(imageInfo).length !== 0) & !deleting ? (
            <>
              <IoCloudDone className="text-6xl text-green-700" />
              <p className="text-xl ml-3">uploaded</p>
            </>
          ) : deleting || processing ? (
            <LoaderSpinner />
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
        {(localImg.length > 0) & isOpenSidebar
          ? localImg.map((file, idx) => (
              <div
                key={idx}
                className="text-center flex flex-col justify-center absolute h-24 w-full bg-background-color rounded-s-lg right-full top-14 p-5"
              >
                <div className="flex items-center justify-start gap-5">
                  <img
                    src={file.preview}
                    alt="previewed file"
                    className="h-14 self-start"
                  />

                  <div className="text-start h-14">
                    <p className="text-xs">name: {file.name}</p>
                    <p className="text-xs">size: {convertSize(file.size)}</p>
                  </div>

                  <GiCrossMark
                    className="absolute top-1 right-2 hover:text-accent-color cursor-pointer"
                    onClick={handleDelete}
                  />
                </div>
              </div>
            ))
          : ""}
      </div>
    );
  }
);

export default ProductImage;
