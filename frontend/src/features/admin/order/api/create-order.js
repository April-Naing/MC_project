import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createOrder = async (userId) => {
  return api.post("/orders/user", userId);
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
