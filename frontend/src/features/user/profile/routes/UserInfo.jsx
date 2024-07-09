import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetUser } from "../api/get-user";
import { useForm } from "react-hook-form";
import userImg from "@/assets/img/user_image.jpg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEditUser } from "../api/edit-user";
import { toast } from "react-toastify";
import { queryClient } from "@/main";

const UserInfo = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { data: userData } = useGetUser();
  const user = userData?.data?.data?.user;

  const { register, setValue, handleSubmit } = useForm();

  if (user) {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("role", user.role?.role);
    setValue("point", user.point);
  }

  const editHandler = () => {
    setIsDisabled(false);
    setIsEditing(true);
  };

  const { mutate: editUserMutation } = useEditUser();

  const onSubmit = (data) => {
    const editData = {
      name: data.name,
      email: data.email,
      role: user?.role?._id,
      point: user?.point,
    };

    editUserMutation(
      { id: user._id, data: editData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["user"],
          });
          toast.success("Info edit success");
          setIsDisabled(true);
          setIsEditing(false);
        },
        onError: () => {
          toast.error("Info edit fail");
        },
      }
    );
  };

  return (
    <>
      <div className="flex">
        <Button
          onClick={editHandler}
          className="ml-auto mr-20 mt-4 hover:bg-teal-700 bg-teal-600"
        >
          Edit
        </Button>
      </div>
      <div className="sm:flex md:ms-10">
        <div className="ms-0 w-full sm:w-1/3 mt-12 mx-auto ">
          <img
            className="w-1/2 h-auto mx-auto rounded-full"
            src={userImg}
            alt=""
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full sm:w-2/3 mt-7 "
        >
          <div className=" md:w-1/2 my-4 mx-4 md:mx-0">
            <Label htmlFor="name" className="me-auto ms-3">
              Name
            </Label>
            <Input
              type="text"
              placeholder="Enter Name"
              {...register("name")}
              disabled={isDisabled}
            />
          </div>
          <div className="md:w-1/2 my-4 mx-4 md:mx-0">
            <Label htmlFor="name" className="me-auto ms-3">
              Email
            </Label>
            <Input
              type="text"
              placeholder="Enter Name"
              {...register("email")}
              disabled={isDisabled}
            />
          </div>
          <div className="md:w-1/2 my-4 mx-4 md:mx-0">
            <Label htmlFor="name" className="me-auto ms-3">
              Role
            </Label>
            <Input type="text" {...register("role")} disabled />
          </div>
          <div className="md:w-1/2 my-4 mx-4 md:mx-0">
            <Label htmlFor="name" className="me-auto ms-3">
              Points
            </Label>
            <Input
              type="text"
              placeholder="Enter Name"
              {...register("point")}
              disabled
            />
          </div>
          {isEditing && (
            <div>
              <Button type="submit">Save Changes</Button>
              <Button
                className="ms-4 bg-teal-700 hover:bg-teal-800"
                onClick={() => {
                  setIsDisabled(true), setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default UserInfo;
