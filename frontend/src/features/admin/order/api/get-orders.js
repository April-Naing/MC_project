import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getOrders = async (page, limit) => {
  let url = "/orders";

  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }
  return api.get(url);
};

export const useGetOrders = ({ page, limit }) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => getOrders(page, limit),
  });
};
