import { useDeleteProduct } from "../api/delete-product";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import AlertDialog from "@/components/shared/AlertDialog";

const DeleteProduct = ({ isOpen, setIsOpen, productId }) => {
  const { mutate: deleteProductMutation, isLoading } =
    useDeleteProduct(productId);

  const productDeleteHandler = () => {
    deleteProductMutation(productId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        toast.success("Deleting success.");
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
      dialogDescription="This action cannot be undone. This will permanently delete your
            products and remove from servers."
      cancelClickHandler={setIsOpen}
      confirmClickHandler={productDeleteHandler}
    ></AlertDialog>
  );
};

export default DeleteProduct;
