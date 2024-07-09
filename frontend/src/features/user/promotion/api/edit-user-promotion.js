import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const editUserPromotion = async ({ id, data }) => {
  return api.patch(`/user/promotions/${id}`, data);
};

export const useEditUserPromotion = () => {
  return useMutation({
    mutationFn: editUserPromotion,
  });
};
