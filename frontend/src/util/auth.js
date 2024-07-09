import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("jwt");
};

export const removeToken = () => {
  Cookies.remove("jwt");
};
