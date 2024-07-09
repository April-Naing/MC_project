import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import Loading from "@/assets/icons/loading.svg?react";
import { useEffect, useState } from "react";

const UserForm = ({ form, onSubmit, user, process, isPending }) => {
  const inputStyle = "rounded-full bg-slate-100 p-3 focus:ring-0";
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (user) {
      setDisabled(true);
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("password", user?.password);
      setValue("role", user.role?._id);
      setValue("point", user.point);
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid items-center gap-4">
        <div className="flex flex-row space-x-12 mx-2">
          <div className="w-1/2 my-2 ms-2">
            <Label htmlFor="name" className="me-auto ms-3">
              Name
            </Label>
            <Input
              type="text"
              placeholder="Enter name"
              className={inputStyle}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-1/2 my-2 ms-2">
            <Label className="me-auto ms-3">Email</Label>
            <Input
              type="text"
              placeholder="Enter email"
              className={inputStyle}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-12 mx-2">
          <div className="w-1/2">
            <Label htmlFor="password" className="me-auto ms-3">
              Password
            </Label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter at least 8 characters"
              className="rounded-full p-3 bg-slate-100 focus:ring-0"
              disabled={disabled}
            />
            {errors.password && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Label htmlFor="passwordConfrim" className="me-auto ms-3">
              Password Confirm
            </Label>
            <Input
              type="password"
              {...register("passwordConfirm")}
              placeholder="Confirm your password again"
              className="rounded-full p-3 bg-slate-100 focus:ring-0"
              disabled={disabled}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-12 mx-2 mb-6">
          <div className="w-1/2">
            <Label className="me-auto ms-3">
              Role<span className=" text-red-600">(*insert only role id*)</span>
            </Label>
            <Input
              type="text"
              {...register("role")}
              className={inputStyle}
              placeholder="Enter Role Id"
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="name" className="me-auto ms-3">
              Point
            </Label>
            <Input
              type="number"
              {...register("point", { valueAsNumber: true })}
              placeholder="Enter point"
              className={`w-1/2 ${inputStyle}`}
            />
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

export default UserForm;
