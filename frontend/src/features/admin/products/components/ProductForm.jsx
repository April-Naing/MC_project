import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Controller } from "react-hook-form";
import { useGetRoles } from "../../role/api/get-role";
import Loading from "@/assets/icons/loading.svg?react";

const ProductForm = ({ form, onSubmit, product, process, isPending }) => {
  const inputStyle = "rounded-full bg-slate-100 p-3 focus:ring-0";
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  const [discounts, setDiscounts] = useState([
    { roleId: "", discountPercentage: "" },
  ]);

  const { data: rolesData, isLoading: isGettingRoles } = useGetRoles();
  const roles = rolesData?.data?.data?.userRoles;

  useEffect(() => {
    if (product) {
      setValue("name", product?.name);
      setValue("description", product?.description);
      setValue("originalPrice", product?.originalPrice);

      if (product.discounts) {
        setDiscounts(product.discounts);
      }
    }
  }, [product, setValue]);

  const handleDiscountChange = (index, field, value) => {
    const newDiscounts = discounts.map((discount, i) => {
      if (i === index) {
        return { ...discount, [field]: value };
      }
      return discount;
    });
    setDiscounts(newDiscounts);
  };

  const addDiscountField = () => {
    setDiscounts([...discounts, { roleId: "", discountPercentage: "" }]);
  };

  const handleFormSubmit = (data) => {
    data.discounts = discounts;
    onSubmit(data);
  };

  return (
    <div className="overflow-auto flex-1 p-4">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid items-center gap-4">
          <div className="flex flex-row space-x-12 mx-2">
            <div className="w-2/3">
              <Label htmlFor="name" className="me-auto ms-3">
                Name
              </Label>
              <Input
                className={inputStyle}
                type="text"
                placeholder="Enter Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 me-auto text-sm ms-4">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="image" className="me-auto ms-3">
                Image
              </Label>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    className={`p-2 text-slate-500 text-sm ${inputStyle}`}
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5 my-2 ms-2">
            <Label htmlFor="description" className="me-auto ms-3">
              Description
            </Label>
            <Input
              className={inputStyle}
              type="text"
              {...register("description")}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1.5 my-2 ms-2">
            <Label htmlFor="originalPrice" className="me-auto ms-3">
              Original Price
            </Label>
            <Input
              className={`w-1/2 ${inputStyle}`}
              type="number"
              {...register("originalPrice", { valueAsNumber: true })}
              placeholder="Enter price"
            />
            {errors.originalPrice && (
              <p className="text-red-500 me-auto text-sm ms-4">
                {errors.originalPrice.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="discounts" className="me-auto ms-3">
              Discounts
            </Label>
            {discounts.map((discount, index) => (
              <div key={index} className="flex flex-row space-x-8 mx-2 mb-2">
                <div className="">
                  <Label
                    htmlFor={`discountPercentage_${index}`}
                    className="me-auto ms-3"
                  >
                    Discount Percentage
                  </Label>
                  <Input
                    className={inputStyle}
                    type="number"
                    placeholder="Enter discount percentage"
                    value={discount.discountPercentage}
                    onChange={(e) =>
                      handleDiscountChange(
                        index,
                        "discountPercentage",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="">
                  <Label htmlFor={`roleId_${index}`} className="me-auto ms-3">
                    User Role
                  </Label>
                  <select
                    className={`block p-3 w-3/4 text-slate-500 text-sm ${inputStyle}`}
                    value={discount.roleId}
                    onChange={(e) =>
                      handleDiscountChange(index, "roleId", e.target.value)
                    }
                  >
                    <option value="">Select Role</option>
                    {!isGettingRoles &&
                      roles &&
                      roles.map((role) => (
                        <option value={role._id} key={role._id}>
                          {role.role}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={addDiscountField}
              className="mt-2 rounded-full ms-4  "
            >
              Add Discount
            </Button>
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
    </div>
  );
};

export default ProductForm;
