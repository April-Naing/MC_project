import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import { zodResolver } from "@hookform/resolvers/zod";
import IsLoading from "@/components/shared/IsLoading";
import userSchema from "../schema/user-schema";
import { useGetUserById } from "../api/get-users";
import UserForm from "../components/UserForm";
import { useEditUser } from "@/features/user/profile/api/edit-user";

const EditUser = ({ isOpen, setIsOpen, userId }) => {
  const form = useForm({
    resolver: zodResolver(userSchema),
  });

  const { data: userData, isLoading: isGettingData } = useGetUserById(userId);
  const user = userData?.data?.data?.user;

  const { mutate: editUserMutation, isPending: isEditing } = useEditUser();

  const onSubmit = (data) => {
    delete data.password;
    delete data.passwordConfirm;
    editUserMutation(
      { id: userId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
          toast.success("Updating success");
          setIsOpen();
        },
        onError: (error) => {
          toast.error("Updating fail" + error.message);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="ms-2">Edit User</DialogTitle>
          <DialogDescription>
            Make changes here. Click update when you are done.
          </DialogDescription>
        </DialogHeader>
        {isGettingData && <IsLoading />}
        {!isGettingData && (
          <UserForm
            form={form}
            onSubmit={onSubmit}
            process="edit"
            user={user}
            isPending={isEditing}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
