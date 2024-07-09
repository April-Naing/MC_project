import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createUserPromotion = async (data) => {
  return api.post("/user/promotions", data);
};

export const useCreateUserPromotion = () => {
  return useMutation({
    mutationFn: createUserPromotion,
  });
};
