import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import productSchema from "../schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "../api/create-product";
import { toast } from "react-toastify";
import { queryClient } from "@/main";
import ProductForm from "../components/ProductForm";
const CreateProduct = ({ isOpen, setIsOpen }) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
  });

  const { mutate: createProduct, isLoading } = useCreateProduct();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("originalPrice", data.originalPrice);
    formData.append("userRole", data.userRole);

    data.discounts.forEach((discount, index) => {
      formData.append(`discounts[${index}][roleId]`, discount.roleId);
      formData.append(
        `discounts[${index}][discountPercentage]`,
        discount.discountPercentage
      );
    });

    createProduct(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });

        toast.success("Creating success.");
        setIsOpen();
      },
      onError: (error) => {
        toast.error("Creation fail" + error.message);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ProductForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;
