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

export const getCartItemsByUser = async () => {
  return api.get("/cartItems/user");
};

export const useGetCartItemsByUser = () => {
  return useQuery({
    queryKey: ["cartItemsByUser"],
    queryFn: getCartItemsByUser,
  });
};
