import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createCoupon = async (data) => {
  return api.post("/coupons", data);
};

export const useCreateCoupon = () => {
  return useMutation({
    mutationFn: createCoupon,
  });
};
