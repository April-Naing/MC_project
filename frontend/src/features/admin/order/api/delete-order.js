import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deleteOrder = async (id) => {
  return api.delete(`/orders/${id}`);
};

export const useDeleteOrder = () => {
  return useMutation({
    mutationFn: deleteOrder,
  });
};
