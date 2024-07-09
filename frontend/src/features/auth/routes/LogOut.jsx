import AlertDialog from "@/components/shared/AlertDialog";
import { logout } from "@/features/auth/api/log-out";
import { queryClient } from "@/main";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogOut = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const logOutHandler = () => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
    logout();
    toast.success("Log out success");
    navigate("/login");
  };

  return (
    <AlertDialog
      openDialog={isOpen}
      closeDialog={setIsOpen}
      dialogDescription="You are leaving ? This action cannot be undone."
      cancelClickHandler={setIsOpen}
      de
      confirmClickHandler={logOutHandler}
    ></AlertDialog>
  );
};

export default LogOut;
