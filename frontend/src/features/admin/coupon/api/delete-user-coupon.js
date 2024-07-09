import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deleteUserCoupon = async (id) => {
  return api.delete(`/user/coupons/${id}`);
};

export const useDeleteUserCoupon = () => {
  return useMutation({
    mutationFn: deleteUserCoupon,
  });
};
