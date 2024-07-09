import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createRole = (data) => {
  return api.post("/userRole", data);
};

export const useCreateRole = () => {
  return useMutation({
    mutationFn: createRole,
  });
};
