import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const editUser = async ({ id, data }) => {
  return api.patch(`/users/${id}`, data);
};

export const useEditUser = () => {
  return useMutation({
    mutationFn: editUser,
  });
};
