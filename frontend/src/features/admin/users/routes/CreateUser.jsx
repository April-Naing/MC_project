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
import UserForm from "../components/UserForm";
import userSchema from "../schema/user-schema";
import { useCreateUser } from "../api/create-user";

const CreateUser = ({ isOpen, setIsOpen }) => {
  const form = useForm({
    resolver: zodResolver(userSchema),
  });

  const { mutate: createUserMutation, isPending: isCreating } = useCreateUser();

  const onSubmit = (data) => {
    if (!data.role) {
      delete data.role;
    }
    createUserMutation(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        toast.success("Creating success");
        setIsOpen();
      },
      onError: (error) => {
        toast.error("Creation fail" + error.message);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="ms-2">Create User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <UserForm
          form={form}
          onSubmit={onSubmit}
          process="create"
          isPending={isCreating}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
