import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import { useUpdateCoupon } from "../api/update-coupon";
import CouponForm from "../components/CouponForm";
import { useGetCouponById } from "../api/get-coupon";

const EditCoupon = ({ isOpen, setIsOpen, couponId }) => {
  const form = useForm({
    // resolver: zodResolver(productSchema),
  });

  const { data: couponData, isLoading: isGettingData } =
    useGetCouponById(couponId);

  const coupon = couponData?.data?.data;
  const { mutate: updateCoupon, isLoading } = useUpdateCoupon(couponId);

  const onSubmit = (data) => {
    updateCoupon(
      { id: couponId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["coupons"],
          });
          toast.success("Updating success");
          setIsOpen();
        },
        onError: (error) => {
          toast.error("Updating fail" + error.message);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="ms-2">Edit Coupon</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CouponForm
          form={form}
          onSubmit={onSubmit}
          coupon={coupon}
          process="Edit"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditCoupon;
