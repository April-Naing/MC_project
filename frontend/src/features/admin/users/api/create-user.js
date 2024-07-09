import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";

export const createUser = async (data) => {
  return api.post("/users", data);
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
