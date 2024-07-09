import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createUserCoupon = async ({ data }) => {
  return api.post("user/coupons", data);
};

export const useCreateUserCoupon = () => {
  return useMutation({
    mutationFn: createUserCoupon,
  });
};
