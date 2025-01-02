import { IoIosReverseCamera } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import robotAvatar from "../../../assets/images/robot-avatar.png";
import { useUploadAvatarMutation } from "../../../redux/api/apiSlice";
import { setUser } from "../../../redux/features/user/userSlice";
import { toast } from "../../../lib/sweetAlert/toast";
import LoaderSpinner from "../../../Components/LoaderSpinner";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  // getting date
  const date = userInfo?.createdAt.toString().toLocaleString().split("T")[0];

  const dispatch = useDispatch();

  const [uploadAvatar, { isLoading, isError, error }] =
    useUploadAvatarMutation();

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

  return (
    <div className="my-4 flex flex-col justify-start items-center">
      {/* information showcase */}
      <div>
        {/* image  */}
        <section className="h-32 w-32 border-additional-color border-2 rounded-full p-1 ring-2 ring-accent-color relative">
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
          <div className="absolute right-1 bottom-1 rounded-full bg-accent-color ring-1 ring-additional-color cursor-pointer p-0.5 hover:bg-on-hover">
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
          <p className="text-xl font-bold">{userInfo?.fullName}</p>
          <p className="text-xs">member till: {date}</p>
        </section>
      </div>
      {/* edit functionality */}
      <div></div>
    </div>
  );
};

export default Profile;
