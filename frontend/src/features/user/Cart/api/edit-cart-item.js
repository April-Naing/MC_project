import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const editCartItem = async ({ id, data }) => {
  console.log("id", id);
  console.log("data", data);
  return api.patch(`/cartItems/${id}`, data);
};

export const useEditCartItem = () => {
  return useMutation({
    mutationFn: editCartItem,
  });
};
