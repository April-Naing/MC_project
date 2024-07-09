import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createPromotion = async (data) => {
  return api.post("/promotions", data);
};

export const useCreatePromotion = () => {
  return useMutation({
    mutationFn: createPromotion,
  });
};
