import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import Loading from "@/assets/icons/loading.svg?react";

const RoleForm = ({ form, onSubmit, role, process, isPending }) => {
  const inputStyle = "rounded-full bg-slate-100 p-3 focus:ring-0";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  if (role) {
    setValue("role", role.role);
    setValue("minPoint", role.minPoint);
    setValue("pointMultiplier", role?.pointMultiplier);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid items-center gap-4">
        <div className="flex flex-row space-x-12 mx-2">
          <div className="w-1/2 my-2 ms-2">
            <Label htmlFor="role name" className="me-auto ms-3">
              Role
            </Label>
            <Input
              type="text"
              placeholder="Enter role name"
              className={inputStyle}
              {...register("role")}
            />
            {errors.role && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.role.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-12 mx-2 mb-6">
          <div className="w-1/2">
            <Label className="me-auto ms-3">Min Point</Label>
            <Input
              type="number"
              placeholder="Enter min point"
              className={inputStyle}
              {...register("minPoint", { valueAsNumber: true })}
            />
            {errors.minPoint && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.minPoint.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Label className="me-auto ms-3">Point Multiplier</Label>
            <Input
              type="number"
              {...register("pointMultiplier", { valueAsNumber: true })}
              placeholder="Enter point multiplier"
              className="rounded-full p-3 bg-slate-100 focus:ring-0"
            />
            {errors.pointMultiplier && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.pointMultiplier.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="rounded-full bg-cyan-500 text-white hover:bg-cyan-400 hover:text-white"
        >
          {isPending && (
            <div className="flex">
              <Loading className="w-4 icon mx-2 text-slate-600" />
              <span className="text-slate-600">
                {process === "create" ? "Creating ..." : "Updating ..."}
              </span>
            </div>
          )}
          {!isPending && (
            <span>{process === "create" ? "Create" : "Update"}</span>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default RoleForm;
