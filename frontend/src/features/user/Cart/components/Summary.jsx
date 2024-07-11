import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGetCouponByUser } from "@/features/admin/coupon/api/get-user-coupon";
import { useGetCartItemsByUser } from "../api/get-cart-item";
import { useCreateOrder } from "@/features/admin/order/api/create-order";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import { useEditUserCoupon } from "@/features/admin/coupon/api/update-user-coupon";
import { useGetUserPromotionByUser } from "../../promotion/api/get-user-promotion";
import { useEditUserPromotion } from "../../promotion/api/edit-user-promotion";

const Summary = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponErr, setCouponErr] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [promo, setPromo] = useState(null);

  // Summary calculate
  const { data: cartItemsDataByUser, isLoading } = useGetCartItemsByUser();
  const cartItems = cartItemsDataByUser?.data?.data;

  const subTotal = cartItems?.reduce((acc, item) => acc + item.price, 0);

  const userId = cartItems ? cartItems[0]?.user?._id : "";

  // get user's coupon
  const { data: userCouponData } = useGetCouponByUser();
  const userCoupons = userCouponData?.data?.data;

  // get user's promotion coupon
  const { data: userPromoCouponData, isLoading: isGettingPromo } =
    useGetUserPromotionByUser();
  const userPromos = userPromoCouponData?.data?.data;

  const { mutate: editCouponMutation } = useEditUserCoupon();

  const { mutate: editPromoMutation } = useEditUserPromotion();

  const handleInputChange = (event) => {
    setCouponCode(event.target.value);
    setDiscount(0);
    setCouponErr("");
  };

  // handle coupon apply
  const couponHandler = () => {
    if (userCoupons && userPromos) {
      const foundCoupon = userCoupons.find(
        (userCoupon) => userCoupon.coupon.code === couponCode
      );

      const foundPromo = userPromos.find(
        (userPromo) => userPromo.promotion.code === couponCode
      );

      if (foundCoupon) {
        setDiscount(foundCoupon.coupon.discountPrice);
        setCouponErr("");
        setCoupon(foundCoupon);
        setPromo(null);
      } else if (foundPromo) {
        setDiscount(foundPromo.promotion.amount);
        setCouponErr("");
        setPromo(foundPromo);
        setCoupon(null);
      } else {
        setDiscount(0);
        setCouponErr(
          "There is no coupon like this in yours.Please enter valid coupon."
        );
      }
    }
  };

  const { mutate: createOrderMutation } = useCreateOrder();

  // handle check out
  const checkOutHandler = () => {
    const totalAmount = discount
      ? subTotal - subTotal * (discount / 100)
      : subTotal;
    createOrderMutation(
      { userId, totalAmount },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["cartItemsByUser"],
          });
          if (coupon) {
            const couponId = coupon._id;
            const data = {
              used_time: coupon.used_time + 1,
            };
            editCouponMutation(
              { id: couponId, data },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["userCoupon"],
                  });
                },
                onError: (error) => {
                  console.log("error from edit coupon", error.message);
                },
              }
            );
          } else if (promo) {
            const promoId = promo._id;
            const data = {
              used_time: promo.used_time + 1,
            };
            editPromoMutation(
              { id: promoId, data },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["userPromotion"],
                  });
                },
                onError: (error) => {
                  console.log("error from edit promo", error.message);
                },
              }
            );
          }
          toast.success("Order checkout success.");
          setCouponCode("");
          setDiscount(0);
        },
        onError: (error) => {
          toast.error("Order checkout fail" + error.message);
        },
      }
    );
  };
  return (
    <div className="w-2/3 m-auto md:w-full p-6">
      <h2 className="text-lg font-semibold mb-4 text-teal-700">Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Cart total</span>
        <span>{subTotal}</span>
      </div>
      <div className=" justify-between mt-6 mb-2">
        <span>Coupon Code</span>
        <Input
          type="text"
          className="mt-3"
          name="couponCode"
          value={couponCode}
          onChange={handleInputChange}
        />
        <span className="ms-3 block text-red-500">{couponErr}</span>
        <Button
          onClick={couponHandler}
          className="my-3 text-neutral-300 bg-teal-900 hover:bg-teal-800"
        >
          Apply
        </Button>
      </div>
      <div className="flex justify-between mb-2 border-b-2 py-4">
        <span>Coupon discount</span>
        <span>{discount} %</span>
      </div>
      <div className="flex justify-between my-8 font-semibold">
        <span>Total</span>
        <span>
          {discount ? subTotal - subTotal * (discount / 100) : subTotal}
        </span>
      </div>
      <div className="my-4">
        <button
          onClick={checkOutHandler}
          className="w-full text-neutral-300 bg-teal-900 py-2 rounded-lg mb-2"
        >
          CHECK OUT
        </button>
      </div>
    </div>
  );
};

export default Summary;
