import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const updateProduct = async ({ id, data }) => {
  return api.patch(`/products/${id}`, data);
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
  });
};
