import { toast } from "react-toastify";
import { queryClient } from "@/main";
import AlertDialog from "@/components/shared/AlertDialog";
import { useDeleteCoupon } from "../api/delete-coupon";

const DeleteCoupon = ({ isOpen, setIsOpen, couponId }) => {
  const { mutate: deleteCoupon, isLoading } = useDeleteCoupon(couponId);

  const productDeleteHandler = () => {
    deleteCoupon(couponId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["coupons"],
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
            coupon and remove from servers."
      cancelClickHandler={setIsOpen}
      confirmClickHandler={productDeleteHandler}
    ></AlertDialog>
  );
};

export default DeleteCoupon;
