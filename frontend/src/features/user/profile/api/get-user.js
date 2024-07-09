import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getUser = async () => {
  return api.get("/users/me");
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
  });
};
