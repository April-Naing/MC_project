import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deleteCartItem = async (id) => {
  return api.delete(`/cartItems/${id}`);
};

export const useDeleteCartItem = () => {
  return useMutation({
    mutationFn: deleteCartItem,
  });
};
