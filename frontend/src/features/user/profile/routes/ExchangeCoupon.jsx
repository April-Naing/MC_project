import AlertDialog from "@/components/shared/AlertDialog";
import { useGetUser } from "../api/get-user";
import { useCreateUserCoupon } from "@/features/admin/coupon/api/create-user-coupon";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import { useUpdateUser } from "@/features/admin/users/api/update-user";

const ExchangeCoupon = ({ isOpen, setIsOpen, couponId, points }) => {
  const { data: userData } = useGetUser();
  const user = userData?.data?.data?.user;
  const userId = user?._id;

  const { mutate: createUserCouponMutation } = useCreateUserCoupon();

  const { mutate: updateUserMutation } = useUpdateUser();

  const exchangeCouponHandler = () => {
    if (user?.point >= points) {
      const data = {
        user: userId,
        coupon: couponId,
      };

      const updatedPoint = {
        point: user?.point - points,
      };

      createUserCouponMutation(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["userCoupon"],
            });
            toast.success("Coupon exchange success!");
            updateUserMutation(
              { id: userId, data: updatedPoint },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["user"],
                  });
                },
                onError: (error) => {
                  console.log(error);
                },
              }
            );
            setIsOpen();
          },
          onError: (error) => {
            toast.error("Coupon exchange fail" + error.message);
          },
        }
      );
    } else {
      toast.error("You do not have enough points to buy coupon.");
    }
  };

  return (
    <AlertDialog
      dialogDescription="This action cannot be undone.This will subtract points from you but will get coupon."
      openDialog={isOpen}
      closeDialog={setIsOpen}
      cancelClickHandler={setIsOpen}
      confirmClickHandler={exchangeCouponHandler}
      className="bg-teal-700 hover:bg-teal-600"
    ></AlertDialog>
  );
};

export default ExchangeCoupon;
