import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGetCouponByUser } from "@/features/admin/coupon/api/get-user-coupon";
import { formatDate, getCurrentDate } from "@/util/dateFormatter";
import { useState } from "react";
import Expired from "@/assets/icons/expired.svg?react";
import { useGetUserPromotionByUser } from "../../promotion/api/get-user-promotion";
import Delete from "@/assets/icons/delete.svg?react";
import { useDeleteUserCoupon } from "@/features/admin/coupon/api/delete-user-coupon";
import { useGetUser } from "../api/get-user";
import { queryClient } from "@/main";
import { toast } from "react-toastify";
import { useDeleteUserPromotion } from "../../promotion/api/delete-user-promotion";

const Coupons = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  const { data: couponData, isLoading: isGettingCoupon } = useGetCouponByUser();
  const coupons = couponData?.data?.data;

  const { data: promotionCouponData, isLoading: isGettingPromotion } =
    useGetUserPromotionByUser();
  const promotionCoupons = promotionCouponData?.data?.data;

  const { mutate: deleteCouponMutation } = useDeleteUserCoupon();

  const couponDeleteHandler = (couponId) => {
    deleteCouponMutation(couponId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["userCoupon"],
        });
        toast.success("Deleting the expired coupon is successful.");
      },
      onError: (error) => {
        toast.error("Fail to delete" + error.message);
      },
    });
  };

  const { mutate: deletePromoMutation } = useDeleteUserPromotion();

  const promoCouponDeleteHandler = (promoId) => {
    deletePromoMutation(promoId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["userPromotion"],
        });
        toast.success("Deleting the expired promotion coupon is successful.");
      },
      onError: (error) => {
        toast.error("Fail to delete" + error.message);
      },
    });
  };

  return (
    <div className="w-full">
      {!isGettingCoupon &&
        coupons &&
        coupons.map((coupon) => (
          <Card
            key={coupon._id}
            className="md:w-2/3 lg:w-1/2 ms-4 md:ms-8 rounded-lg mt-8 my-8"
          >
            <CardContent className="flex p-0 bg-teal-400 rounded-t-lg justify-evenly">
              <div className="border-r-2 p-2">
                <h3 className="text-xs sm:text-base">
                  Code : {coupon.coupon.code}
                </h3>
                <h3 className=" text-xs sm:text-base">
                  {coupon.coupon.discountPrice} off on any purchase
                </h3>
              </div>
              <div className="">
                <h1 className="ps-4 sm:pt-2 sm:m-auto text-sm sm:text-xl">
                  {coupon.coupon.discountPrice} Off
                </h1>
              </div>
            </CardContent>
            <CardFooter className="py-4">
              <div className="text-xs sm:text-base">
                <span>Valid Date : {formatDate(coupon.coupon.startDate)}</span>
                <span> to {formatDate(coupon.coupon.endDate)}</span>
              </div>
              {currentDate > coupon.coupon.endDate && (
                <div className="flex pt-1 text-xs ms-8 sm:text-base text-red-800">
                  <Expired className="icon w-2 sm:w-4" />
                  <span>Expired</span>
                  <Delete
                    className="icon w-4 ms-4 text-black hover:cursor-pointer"
                    onClick={() => couponDeleteHandler(coupon._id)}
                  />
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      {!isGettingPromotion &&
        promotionCoupons.map((promotionCoupon) => (
          <Card
            key={promotionCoupon._id}
            className="md:w-2/3 lg:w-1/2 ms-4 md:ms-8 rounded-lg mt-8 my-8"
          >
            <CardContent className="flex h-20 p-0 bg-teal-400 rounded-t-lg justify-evenly">
              <div className="border-r-2 p-2">
                <h3 className="text-xs sm:text-base">
                  Code : {promotionCoupon.promotion.code}
                </h3>
                <h3 className=" text-xs sm:text-base">
                  {promotionCoupon.promotion.discountPrice} off on any purchase
                </h3>
              </div>
              <div className="">
                <h1 className="ps-4 sm:pt-2 sm:m-auto text-sm sm:text-xl">
                  {promotionCoupon.promotion.discountPrice} Off
                </h1>
              </div>
            </CardContent>
            <CardFooter>
              <div className="pt-2 text-xs sm:text-base">
                <span>
                  Valid Date : {formatDate(promotionCoupon.promotion.startDate)}
                </span>
                <span>to {formatDate(promotionCoupon.promotion.endDate)}</span>
              </div>
              {currentDate > promotionCoupon.promotion.endDate && (
                <div className="flex pt-1 text-xs ms-10 sm:text-base text-red-800">
                  <Expired className="icon w-2 sm:w-4" />
                  <span>Expired</span>
                  <Delete
                    className="icon w-4 ms-4 text-black hover:cursor-pointer hover:text-red-500"
                    onClick={() =>
                      promoCouponDeleteHandler(promotionCoupon._id)
                    }
                  />
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default Coupons;
