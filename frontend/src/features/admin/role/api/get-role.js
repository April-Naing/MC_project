import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getRoles = async ({ page, limit }) => {
  let url = "/userRole";

  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }
  return api.get(url);
};

export const useGetRoles = (page, limit) => {
  return useQuery({
    queryKey: ["roles", page, limit],
    queryFn: () => getRoles(page, limit),
  });
};

export const getRoleById = async (id) => {
  if (!id) return false;
  return api.get(`/userRole/${id}`);
};

export const useGetRoleById = (id) => {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => getRoleById(id),
  });
};
