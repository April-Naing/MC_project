import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axio";
import Cookies from "js-cookie";

export const login = async (data) => {
  return await api.post("/auth/login", data).then((res) => {
    const token = res.data.token;
    Cookies.set("jwt", token, { expires: 1 });
    return res;
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
