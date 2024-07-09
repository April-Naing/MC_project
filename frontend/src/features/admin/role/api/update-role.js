import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const editRole = async ({ id, data }) => {
  return api.patch(`/userRole/${id}`, data);
};

export const useEditRole = () => {
  return useMutation({
    mutationFn: editRole,
  });
};
