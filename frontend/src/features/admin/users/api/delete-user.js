import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deleteUser = async (id) => {
  return api.delete(`/users/${id}`);
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
