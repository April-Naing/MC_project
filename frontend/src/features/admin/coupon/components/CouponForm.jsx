import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { formatEditDate } from "@/util/dateFormatter";
import Loading from "@/assets/icons/loading.svg?react";

const CouponForm = ({ form, onSubmit, coupon, process, isPending }) => {
  const inputStyle = "rounded-full bg-slate-100 p-3 focus:ring-0";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  if (coupon) {
    setValue("code", coupon?.code);
    setValue("startDate", formatEditDate(coupon.startDate));
    setValue("endDate", formatEditDate(coupon.endDate));
    setValue("discountPrice", coupon?.discountPrice);
    setValue("points", coupon.points);
    setValue("availableTime", coupon.availableTime);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid items-center gap-4">
        <div className="w-1/2 my-2 ms-2">
          <Label className="me-auto ms-3">Code</Label>
          <Input
            type="text"
            placeholder="Enter code"
            className={inputStyle}
            {...register("code")}
          />
        </div>
        <div className="flex flex-row space-x-12 mx-2">
          <div className="w-1/2">
            <Label className="me-auto ms-3">Start Date</Label>
            <Input
              type="date"
              {...register("startDate")}
              className={inputStyle}
            />
          </div>
          <div className="w-1/2">
            <Label className="me-auto ms-3">End Date</Label>
            <Input
              type="date"
              {...register("endDate")}
              className={inputStyle}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-12 mx-2">
          <div className="w-1/2">
            <Label className="me-auto ms-3">Discount Price(by %)</Label>
            <Input
              type="number"
              {...register("discountPrice", { valueAsNumber: true })}
              placeholder="Enter discount amount"
              className={inputStyle}
            />
          </div>
          <div className="w-1/2">
            <Label className="me-auto ms-3">Point</Label>
            <Input
              type="number"
              {...register("points", { valueAsNumber: true })}
              placeholder="Enter point"
              className={inputStyle}
            />
            {errors.points && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.originalPrice.message}
              </p>
            )}
          </div>
        </div>
        <div className=" my-2 ms-2">
          <Label className="me-auto ms-3">Available Time</Label>
          <Input
            type="number"
            {...register("availableTime", { valueAsNumber: true })}
            placeholder="Enter available time"
            className={`w-1/2 ${inputStyle}`}
          />
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
          {process === "create" ? "Create" : "Update"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CouponForm;
