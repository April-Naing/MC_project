import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deleteUserPromotion = async (id) => {
  return api.delete(`/user/promotions/${id}`);
};

export const useDeleteUserPromotion = () => {
  return useMutation({
    mutationFn: deleteUserPromotion,
  });
};
