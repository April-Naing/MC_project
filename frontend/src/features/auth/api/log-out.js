import api from "@/lib/axio";
import Cookies from "js-cookie";

export const logout = async () => {
  api.get("/auth/logout").then(() => {
    Cookies.remove("jwt");
  });
};
