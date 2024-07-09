import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deletePromotion = async (id) => {
  return api.delete(`/promotions/${id}`);
};

export const useDeletePromotion = () => {
  return useMutation({
    mutationFn: deletePromotion,
  });
};
