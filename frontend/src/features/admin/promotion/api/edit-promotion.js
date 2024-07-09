import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const editPromotion = async ({ id, data }) => {
  return api.patch(`/promotions/${id}`, data);
};

export const useEditPromotion = () => {
  return useMutation({
    mutationFn: editPromotion,
  });
};
