import { useNavigate } from "react-router-dom";
import { useGetUser } from "@/features/user/profile/api/get-user";

import IsLoading from "@/components/shared/IsLoading";
import { queryClient } from "@/main";

const ProtectedRoute = () => {
  queryClient.invalidateQueries({
    queryKey: ["user"],
  });
  const { data: userData, isLoading } = useGetUser();
  const user = userData?.data?.data?.user;

  const navigate = useNavigate();

  if (!isLoading) {
    if (!user) {
      navigate("/login");
    }

    if (user && user.role) {
      if (user.role.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }
  }

  if (isLoading) {
    return <IsLoading />;
  }
};

export default ProtectedRoute;
