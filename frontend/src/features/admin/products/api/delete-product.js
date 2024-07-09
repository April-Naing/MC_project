import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deleteProduct = async (id) => {
  return api.delete(`/products/${id}`);
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
  });
};
