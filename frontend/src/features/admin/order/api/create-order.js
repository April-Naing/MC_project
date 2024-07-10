import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createOrder = async ({ userId, totalAmount }) => {
  return api.post("/orders/user", { userId, totalAmount });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
