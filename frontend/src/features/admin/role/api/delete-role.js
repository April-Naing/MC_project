import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const deleteRole = async (id) => {
  return api.delete(`/userRole/${id}`);
};

export const useDeleteRole = () => {
  return useMutation({
    mutationFn: deleteRole,
  });
};
