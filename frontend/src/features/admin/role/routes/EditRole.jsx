import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import IsLoading from "@/components/shared/IsLoading";
import RoleForm from "../components/RoleForm";
import { useGetRoleById } from "../api/get-role";
import roleSchema from "../schema/role-schema";
import { useEditRole } from "../api/update-role";

const EditRole = ({ isOpen, setIsOpen, roleId }) => {
  const { data: editRoleData, isLoading: isGettingData } =
    useGetRoleById(roleId);

  const role = editRoleData?.data?.data;

  const form = useForm({
    resolver: zodResolver(roleSchema),
  });

  const { mutate: editRoleMutation, isLoading: isEditing } = useEditRole();
  const onSubmit = (data) => {
    editRoleMutation(
      { id: roleId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["roles"],
          });

          toast.success("Updating success.");
          setIsOpen();
        },
        onError: (error) => {
          toast.error("Fail to update" + error.message);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes here. Click update when you are done.
          </DialogDescription>
        </DialogHeader>

        {isGettingData && <IsLoading />}
        {!isGettingData && (
          <RoleForm
            form={form}
            onSubmit={onSubmit}
            process="edit"
            role={role}
            isPending={isEditing}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditRole;
