import api from "@/lib/axio";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
export const register = async (data) => {
  return api.post("/auth/signin", data).then((res) => {
    const token = res.data.token;
    Cookies.set("jwt", token, { expires: 1 });
    return res;
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
