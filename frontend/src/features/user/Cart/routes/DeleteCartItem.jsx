import AlertDialog from "@/components/shared/AlertDialog";
import { useDeleteCartItem } from "../api/delete-cart-item";
import { queryClient } from "@/main";
import { toast } from "react-toastify";

const DeleteCartItem = ({ isOpen, setIsOpen, cartItemId }) => {
  const { mutate: deleteCartItemMutation, isLoading } =
    useDeleteCartItem(cartItemId);
  const cartItemDeleteHandler = () => {
    deleteCartItemMutation(cartItemId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cartItemsByUser"],
        });
        setIsOpen();
      },
      onError: (error) => {
        toast.error("Deleting fail" + error.message);
      },
    });
  };

  return (
    <AlertDialog
      openDialog={isOpen}
      closeDialog={setIsOpen}
      dialogDescription="This action cannot be undone."
      cancelClickHandler={setIsOpen}
      confirmClickHandler={cartItemDeleteHandler}
    ></AlertDialog>
  );
};

export default DeleteCartItem;
