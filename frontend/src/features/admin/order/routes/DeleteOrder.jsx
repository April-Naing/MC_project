import AlertDialog from "@/components/shared/AlertDialog";
import { useDeleteOrder } from "../api/delete-order";
import { queryClient } from "@/main";
import { toast } from "react-toastify";

const DeleteOrder = ({ isOpen, setIsOpen, orderId }) => {
  const { mutate: deleteOrderMutation } = useDeleteOrder(orderId);
  const orderDeleteHandler = () => {
    deleteOrderMutation(orderId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
        toast.success("Deleting success");

        setIsOpen();
      },
      onError: (error) => {
        toast.error("Fail to delete" + error.message);
      },
    });
  };
  return (
    <AlertDialog
      openDialog={isOpen}
      closeDialog={setIsOpen}
      dialogDescription="This action cannot be undone.This will permanently delete order and remove from our server."
      confirmClickHandler={orderDeleteHandler}
      cancelClickHandler={setIsOpen}
    ></AlertDialog>
  );
};

export default DeleteOrder;
