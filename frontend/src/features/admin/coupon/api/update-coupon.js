import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const updateCoupon = async ({ id, data }) => {
  return api.patch(`/coupons/${id}`, data);
};

export const useUpdateCoupon = () => {
  return useMutation({
    mutationFn: updateCoupon,
  });
};
