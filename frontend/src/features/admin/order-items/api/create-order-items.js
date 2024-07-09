import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createOrderItems = async (data) => {
  return api.post("/orderItems", data);
};

export const useCreateOrderItems = () => {
  return useMutation({
    mutationFn: createOrderItems,
  });
};
