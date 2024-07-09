import AlertDialog from "@/components/shared/AlertDialog";
import { queryClient } from "@/main";
import { toast } from "react-toastify";
import { useDeleteRole } from "../api/delete-role";

const DeleteRole = ({ isOpen, setIsOpen, roleId }) => {
  const { mutate: deleteRoleMutation } = useDeleteRole();

  const userDeleteHandler = () => {
    deleteRoleMutation(roleId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["roles"],
        });
        toast.success("Deleting role is successful.");
        setIsOpen();
      },
      onError: (error) => {
        toast.error("Fail to delete role" + error.message);
      },
    });
  };
  return (
    <AlertDialog
      openDialog={isOpen}
      closeDialog={setIsOpen}
      confirmClickHandler={userDeleteHandler}
      cancelClickHandler={setIsOpen}
      dialogDescription="This action cannot be undone.This will permanently delete user role and remove from our server."
    ></AlertDialog>
  );
};

export default DeleteRole;
