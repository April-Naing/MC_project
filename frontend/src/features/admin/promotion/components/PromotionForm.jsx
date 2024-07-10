import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { formatEditDate } from "@/util/dateFormatter";
import Loading from "@/assets/icons/loading.svg?react";

const PromotionForm = ({ form, onSubmit, promotion, process, isPending }) => {
  const inputStyle = "rounded-full bg-slate-100 p-3 focus:ring-0";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  if (promotion) {
    setValue("name", promotion.name);
    setValue("description", promotion.description);
    setValue("code", promotion?.code);
    setValue("startDate", formatEditDate(promotion.startDate));
    setValue("endDate", formatEditDate(promotion.endDate));
    setValue("amount", promotion?.amount);
    setValue("availableTime", promotion.availableTime);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid items-center gap-4">
        <div className="flex flex-row space-x-12 mx-2">
          <div className="w-1/2 my-2 ms-2">
            <Label className="me-auto ms-3">Name</Label>
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
            <Label className="me-auto ms-3">Code</Label>
            <Input
              type="text"
              placeholder="Enter code"
              className={inputStyle}
              {...register("code")}
            />
            {errors.code && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.code.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-1/2 my-2 ms-2">
          <Label className="me-auto ms-3">Description</Label>
          <Input
            type="text"
            placeholder="Enter description"
            className={inputStyle}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 me-auto text-sm ms-4">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="flex flex-row space-x-12 mx-2 ">
          <div className="w-1/2 my-2">
            <Label className="me-auto ms-3">Start Date</Label>
            <Input
              type="date"
              {...register("startDate")}
              className={inputStyle}
            />
            {errors.startDate && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.startDate.message}
              </p>
            )}
          </div>
          <div className="w-1/2 my-2">
            <Label htmlFor="image" className="me-auto ms-3">
              End Date
            </Label>
            <Input
              type="date"
              {...register("endDate")}
              className={inputStyle}
            />
            {errors.endDate && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-12 mx-2 mb-6">
          <div className="w-1/2">
            <Label className="me-auto ms-3">Discount Amount(%)</Label>
            <Input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              placeholder="Enter discount amount"
              className={inputStyle}
            />
            {errors.amount && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <Label className="me-auto ms-3">Available Time</Label>
            <Input
              type="number"
              {...register("availableTime", { valueAsNumber: true })}
              placeholder="Enter available time"
              className={inputStyle}
            />
            {errors.availableTime && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.availableTime.message}
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

export default PromotionForm;
