import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deleteCoupon = async (id) => {
  return api.delete(`/coupons/${id}`);
};

export const useDeleteCoupon = () => {
  return useMutation({
    mutationFn: deleteCoupon,
  });
};
