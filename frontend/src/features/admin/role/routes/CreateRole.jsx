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
import RoleForm from "../components/RoleForm";
import roleSchema from "../schema/role-schema";
import { useCreateRole } from "../api/create-role";

const CreateRole = ({ isOpen, setIsOpen }) => {
  const form = useForm({
    resolver: zodResolver(roleSchema),
  });

  const { mutate: createRoleMutation, isPending: isCreating } = useCreateRole();

  const onSubmit = (data) => {
    createRoleMutation(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["roles"],
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
        <RoleForm
          form={form}
          onSubmit={onSubmit}
          process="create"
          isPending={isCreating}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRole;
