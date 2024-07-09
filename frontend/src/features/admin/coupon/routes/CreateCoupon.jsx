import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useCreateCoupon } from "../api/create-coupon";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import CouponForm from "../components/CouponForm";

const CreateCoupon = ({ isOpen, setIsOpen }) => {
  const form = useForm();

  const { mutate: createCoupon, isLoading } = useCreateCoupon();

  const onSubmit = (data) => {
    createCoupon(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["coupons"],
        });
        toast.success("Creating success");
        setIsOpen();
      },
      onError: (error) => {
        toast.error("Creation fail" + error.message);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="ms-2">Create Coupon</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when yoy are done.
          </DialogDescription>
        </DialogHeader>
        <CouponForm form={form} onSubmit={onSubmit} process="create" />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCoupon;
