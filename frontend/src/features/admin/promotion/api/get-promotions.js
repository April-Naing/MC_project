import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getPromotions = async ({ date, page, limit }) => {
  let url = "/promotions";

  if (date !== undefined) {
    url += `?date=${date}`;
  }

  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }

  return api.get(url);
};

export const useGetPromotions = (date, page, limit) => {
  return useQuery({
    queryKey: ["promotions", date, page, limit],
    queryFn: () => getPromotions(date, page, limit),
  });
};

export const getPromotionById = async (id) => {
  if (!id) return false;
  return api.get(`/promotions/${id}`);
};

export const useGetPromotionById = (id) => {
  return useQuery({
    queryKey: ["promotion", id],
    queryFn: () => getPromotionById(id),
    enabled: id !== null,
  });
};
