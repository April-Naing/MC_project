import { toast } from "react-toastify";
import { queryClient } from "@/main";
import AlertDialog from "@/components/shared/AlertDialog";
import { useDeletePromotion } from "../api/delete-promotion";

const DeletePromotion = ({ isOpen, setIsOpen, promotionId }) => {
  const { mutate: deleteCouponMutation } = useDeletePromotion(promotionId);

  const promotionDeleteHandler = () => {
    deleteCouponMutation(promotionId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["promotions"],
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
            promotion and remove from servers."
      cancelClickHandler={setIsOpen}
      confirmClickHandler={promotionDeleteHandler}
    ></AlertDialog>
  );
};

export default DeletePromotion;
