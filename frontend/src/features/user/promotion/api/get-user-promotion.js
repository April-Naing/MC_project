import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getUserPromotionByUser = async () => {
  return api.get("/user/promotions/user");
};

export const useGetUserPromotionByUser = () => {
  return useQuery({
    queryKey: ["userPromotion"],
    queryFn: getUserPromotionByUser,
  });
};
