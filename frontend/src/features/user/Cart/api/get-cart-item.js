import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getCartItems = async () => {
  return api.get("/cartItems");
};

export const useGetCartItems = () => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });
};

export const getCartItemById = async (id) => {
  return api.get(`/cartItems/${id}`);
};

export const useGetCartItemById = (id) => {
  return useQuery({
    queryKey: ["cartItem"],
    queryFn: () => getCartItemById(id),
  });
};

export const getCartItemsByUser = async () => {
  return api.get("/cartItems/user");
};

export const useGetCartItemsByUser = () => {
  return useQuery({
    queryKey: ["cartItemsByUser"],
    queryFn: getCartItemsByUser,
  });
};
