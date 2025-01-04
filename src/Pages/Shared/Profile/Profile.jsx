import { IoIosReverseCamera } from "react-icons/io";
import { useDispatch } from "react-redux";
import robotAvatar from "../../../assets/images/robot-avatar.png";
import {
  useChangeCurrentPasswordMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserAccountMutation,
  useUploadAvatarMutation,
} from "../../../redux/api/apiSlice";
import { setUser } from "../../../redux/features/user/userSlice";
import { toast } from "../../../lib/sweetAlert/toast";
import { CiEdit } from "react-icons/ci";
import LoaderSpinner from "../../../Components/LoaderSpinner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { TbEyeClosed } from "react-icons/tb";

const Profile = () => {
  const [passView, setPassView] = useState(false);
  const [confirmPassView, setConfirmPassView] = useState(false);
  const [edit, setEdit] = useState(false);

  const {
    register: registerFullName,
    handleSubmit: handleFullNameSubmit,
    formState: { errors: fullNameErrors },
  } = useForm();

  const {
    register: registerPass,
    handleSubmit: handlePassSubmit,
    formState: { errors: passChangeError },
  } = useForm();

  const dispatch = useDispatch();

  // mutations
  const [uploadAvatar, { isLoading, isError, error }] =
    useUploadAvatarMutation();
  const [updateUserAccount] = useUpdateUserAccountMutation();
  const [changeCurrentPass] = useChangeCurrentPasswordMutation();

  // fetching user data
  const [triggerGetUser] = useLazyGetUserQuery();
  const { data: userData } = useGetUserQuery();
  const userInfo = userData?.data;

  // getting date
  const date = userInfo?.createdAt?.toString().toLocaleString().split("T")[0];

  const formData = [
    {
      label: "full name",
      type: "text",
      name: "fullName",
      defaultValue: userInfo?.data?.fullName,
      required: true,
    },
  ];

  // edit button handler
  const handleProfileEdit = () => {
    setEdit(!edit);
  };

  // file handler
  const handleFile = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("publicId", userInfo?.avatarPublicId);

    try {
      const res = await uploadAvatar(formData).unwrap();
      const newUser = {
        ...userInfo,
        avatar: res.data.avatarUrl,
        avatarPublicId: res.data.avatarPublicId,
      };

      if (res.statusCode === 200) {
        dispatch(setUser(newUser));
        toast.fire({
          title: "Avatar is uploaded",
          icon: "success",
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error?.data?.message);
      console.log("Error while uploading avatar");
    }
  };

  const handleFullNameUpdate = async (data) => {
    try {
      const res = await updateUserAccount({ fullName: data.fullName }).unwrap();
      if (res?.statusCode === 200) {
        const updatedUser = { ...userInfo, fullName: data.fullName };
        dispatch(setUser(updatedUser));
        triggerGetUser();
        setEdit(false);
        toast.fire({
          title: "User updated successfully",
          icon: "success",
          timer: 2000,
        });
      }
    } catch (error) {
      console.log(error?.data?.message);
    }
  };

  const handlePassUpdate = async (data) => {
    try {
      const res = await changeCurrentPass({
        oldPassword: data.password,
        newPassword: data.confirmPass,
      }).unwrap();
      if (res?.statusCode === 200) {
        toast.fire({
          title: "Password updated successfully",
          icon: "success",
          timer: 2000,
        });
      }
    } catch (error) {
      if (error?.data?.message === "Invalid old password") {
        toast.fire({
          title: "Invalid old password",
          icon: "error",
          timer: 2000,
        });
      }
      console.log(error?.data?.message);
    }
  };

  return (
    <div className="my-4 flex flex-col px-[10%] lg:px-[30%]">
      {/* information showcase */}
      <div>
        {/* image  */}
        <section className="h-32 w-32 border-additional-color/40 border-2 rounded-full p-1 ring-2 ring-accent-color relative ml-auto mr-auto">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <LoaderSpinner />
            </div>
          ) : (
            <img
              src={userInfo?.avatar || robotAvatar}
              alt={userInfo?.username + "profile picture"}
              className="w-full h-full rounded-full"
            />
          )}
          {/* edit profile button */}
          <div className="absolute right-1 bottom-1 rounded-full bg-accent-color ring-1 ring-additional-color/50 cursor-pointer p-0.5 hover:bg-on-hover">
            <IoIosReverseCamera className="h-5 w-5 text-white cursor-pointer" />
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFile}
            />
          </div>
        </section>
        {/* name section  */}
        <section className="text-center my-2 font-secondaryFont">
          <div className="flex gap-2 items-center justify-center">
            <p className="text-xl font-bold">{userInfo?.fullName}</p>{" "}
            <CiEdit
              className="cursor-pointer hover:text-accent-color"
              onClick={handleProfileEdit}
            />
          </div>
          <p className="text-xs">member till: {date}</p>
        </section>
      </div>

      {/* edit functionality */}
      <div
        className={`capitalize transition-all duration-300 ${
          edit ? "block" : "hidden"
        }`}
      >
        <form
          onSubmit={handleFullNameSubmit(handleFullNameUpdate)}
          className="space-y-2 font-bold relative"
        >
          {/* input fields */}
          {formData.map((data) => (
            <div key={data.label}>
              <label htmlFor={data.name} className="text-gray-700 md:text-lg ">
                {data.label}
              </label>
              <input
                className={`block w-full p-2 md:p-3 md:mt-1 border ${
                  fullNameErrors?.[data.name]
                    ? "border-red-600"
                    : "border-secondary-color"
                }`}
                {...registerFullName(data.name, {
                  required: {
                    value: data.required,
                    message: `${data.label} is required`,
                  },
                })}
                type={data.type}
                id={data.name}
                name={data.name}
                autoComplete="auto"
                defaultValue={data.defaultValue || ""}
              />
              <span className="text-error text-xs">
                {fullNameErrors?.[data.name]?.message}
              </span>
              <input
                type="submit"
                value="Update Full Name"
                className="btn bg-accent-color hover:bg-on-hover rounded-none text-white w-full left-full"
              />
            </div>
          ))}
        </form>
      </div>

      {/* password  */}
      <form onSubmit={handlePassSubmit(handlePassUpdate)}>
        <h1 className="text-center font-bold text-lg my-4">Change Password</h1>
        {/* current pass  */}
        <div className="relative group h-5 pb-10">
          <input
            className={`outline-none w-full bg-transparent border-b ${
              passChangeError?.password
                ? "border-red-600"
                : "border-secondary-color"
            }`}
            {...registerPass("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Use at least 8 char",
              },
              validate: {
                hasLowercase: (value) =>
                  /[a-z]/.test(value) || "Use at least one lowercase letter",
                hasUppercase: (value) =>
                  /[A-Z]/.test(value) || "Use at least one uppercase letter",
                hasSpecialChar: (value) =>
                  /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(value) ||
                  "Use one special char",
                hasNumber: (value) =>
                  /[0-9]/.test(value) || "Use at least one number",
              },
            })}
            type={!passView ? "password" : "text"}
            name="password"
            autoComplete="current-password"
            placeholder="Current Password"
          />

          {/* eye icon button */}
          <button type="button" onClick={() => setPassView(!passView)}>
            {passView ? (
              <BsFillEyeFill
                className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
                  passChangeError?.password && "text-red-600"
                }`}
              />
            ) : (
              <TbEyeClosed
                className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
                  passChangeError?.password && "text-red-600"
                }`}
              />
            )}
          </button>
          <p className="text-red-600 text-xs break-words">
            {passChangeError?.password?.message}
          </p>
        </div>

        {/* new pass  */}
        <div className="relative group h-5 pb-10">
          <input
            className={`outline-none w-full bg-transparent border-b ${
              passChangeError?.confirmPass
                ? "border-red-600"
                : "border-secondary-color"
            }`}
            {...registerPass("confirmPass", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Use at least 8 char",
              },
              validate: {
                hasLowercase: (value) =>
                  /[a-z]/.test(value) || "Use at least one lowercase letter",
                hasUppercase: (value) =>
                  /[A-Z]/.test(value) || "Use at least one uppercase letter",
                hasSpecialChar: (value) =>
                  /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(value) ||
                  "Use one special char",
                hasNumber: (value) =>
                  /[0-9]/.test(value) || "Use at least one number",
              },
            })}
            type={!confirmPassView ? "password" : "text"}
            name="confirmPass"
            autoComplete="current-password"
            placeholder="New Password"
          />

          {/* eye icon button */}
          <button
            type="button"
            onClick={() => setConfirmPassView(!confirmPassView)}
          >
            {confirmPassView ? (
              <BsFillEyeFill
                className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
                  passChangeError?.confirmPass && "text-red-600"
                }`}
              />
            ) : (
              <TbEyeClosed
                className={`absolute top-1 right-2 group-focus-within:text-accent-color ${
                  passChangeError?.confirmPass && "text-red-600"
                }`}
              />
            )}
          </button>
          <p className="text-red-600 text-xs break-words">
            {passChangeError?.confirmPass?.message}
          </p>
          {/* button  */}
          <button
            type="submit"
            className="btn btn-outline hover:bg-accent-color text-accent-color rounded-sm w-full mt-1"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
