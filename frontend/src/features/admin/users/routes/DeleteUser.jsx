import AlertDialog from "@/components/shared/AlertDialog";
import { useDeleteUser } from "../api/delete-user";
import { queryClient } from "@/main";
import { toast } from "react-toastify";

const DeleteUser = ({ isOpen, setIsOpen, userId }) => {
  const { mutate: deleteUserMutation } = useDeleteUser();

  const userDeleteHandler = () => {
    deleteUserMutation(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        toast.success("Deleting user is successful.");
        setIsOpen();
      },
      onError: (error) => {
        toast.error("Fail to delete user" + error.message);
      },
    });
  };
  return (
    <AlertDialog
      openDialog={isOpen}
      closeDialog={setIsOpen}
      confirmClickHandler={userDeleteHandler}
      cancelClickHandler={setIsOpen}
      dialogDescription="This action cannot be undone.This will permanently delete user data and remover from our server."
    ></AlertDialog>
  );
};

export default DeleteUser;
