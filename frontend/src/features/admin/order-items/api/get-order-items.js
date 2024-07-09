import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getOrderItems = async () => {
  return api.get("/orderItems");
};

export const useGetOrderItems = () => {
  return useQuery({
    queryKey: ["orderItems"],
    queryFn: getOrderItems,
  });
};

export const getOrderItemsByUser = async () => {
  return api.get("/orderItems/user");
};

export const useGetOrderItemsByUser = () => {
  return useQuery({
    queryKey: ["orderItemsByUser"],
    queryFn: getOrderItemsByUser,
  });
};
