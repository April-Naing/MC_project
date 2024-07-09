import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const updateUser = async ({ id, data }) => {
  if (!id) return false;
  return api.patch(`users/${id}`, data);
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
