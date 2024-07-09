import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getUsers = async (page, limit) => {
  let url = "/users";
  if (page && limit) {
    url += `?page=${page}&limit=${limit}`;
  }
  return api.get(url);
};

export const useGetUsers = ({ page, limit }) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers(page, limit),
  });
};

export const getMe = async () => {
  return api.get("/users/me");
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user_Me"],
    queryFn: getMe,
  });
};

export const getUserById = async (id) => {
  if (!id) return false;
  return api.get(`/users/${id}`);
};

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};
