import api from "@/lib/axio";
import { useQuery } from "@tanstack/react-query";

export const getCoupons = async () => {
  return api.get("/coupons");
};

export const useGetCoupons = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: getCoupons,
  });
};

export const getCouponById = async (id) => {
  if (!id) return false;
  return api.get(`/coupons/${id}`);
};

export const useGetCouponById = (id) => {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: () => getCouponById(id),
    enabled: id !== null,
  });
};

export const getCouponByCode = async (code) => {
  // return api.get(`/coupons/code/${code}`)
  try {
    const response = await api.get(`/coupons/code/${code}`);
    return response;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Error fetching coupon");
  }
};

export const useGetCouponByCode = (code) => {
  return useQuery({
    queryKey: ["couponCode", code],
    queryFn: () => getCouponByCode(code),
    enabled: !!code,
    onError: (error) => {
      console.error("Error fetching coupon:", error.message);
      // Additional error handling logic can go here
    },
  });
};
