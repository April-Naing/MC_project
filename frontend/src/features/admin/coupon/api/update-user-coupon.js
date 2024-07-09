import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const editUserCoupon = async ({ id, data }) => {
  return api.patch(`/user/coupons/${id}`, data);
};

export const useEditUserCoupon = () => {
  return useMutation({
    mutationFn: editUserCoupon,
  });
};
