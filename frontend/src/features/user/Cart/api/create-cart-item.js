import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createCartItems = async (data) => {
  return api.post("/cartItems", data);
};

export const useCreateCartItems = () => {
  return useMutation({
    mutationFn: createCartItems,
  });
};
