import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getProducts = async (page, limit) => {
  let url = "/products";

  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }

  return api.get(url);
};

export const useGetProducts = ({ page, limit }) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getProducts(page, limit),
  });
};

export const getProductById = async (id) => {
  if (!id) return false;
  return api.get(`/products/${id}`);
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: id !== null,
  });
};
