import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getUserCouponByUser = () => {
  return api.get("/user/coupons/user");
};

export const useGetCouponByUser = () => {
  return useQuery({
    queryKey: ["userCoupon"],
    queryFn: () => getUserCouponByUser(),
  });
};
