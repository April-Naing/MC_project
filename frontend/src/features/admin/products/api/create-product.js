import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createProduct = async (data) => {
  return api.post("/products", data);
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};
