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
import { toast } from "react-toastify";
import { useGetProductById } from "../api/get-products";
import { useUpdateProduct } from "../api/update-product";
import { queryClient } from "@/main";
import ProductForm from "../components/ProductForm";

const EditProduct = ({ isOpen, setIsOpen, productId }) => {
  const { data: editProductData, isLoading: isLoadingProduct } =
    useGetProductById(productId);

  const product = editProductData?.data?.data?.product;

  const form = useForm({
    resolver: zodResolver(productSchema),
  });

  const { mutate: editProductMutation, isLoading: isEditing } =
    useUpdateProduct();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image ? data.image : product?.image);
    formData.append("originalPrice", data.originalPrice);
    formData.append("discountAmount", data.discountAmount);
    formData.append("userRole", data.userRole);

    editProductMutation(
      { id: productId, data: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["products"],
          });

          toast.success("Updating success.");
          setIsOpen();
        },
        onError: (error) => {
          toast.error("Creation fail" + error.message);
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
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          form={form}
          onSubmit={onSubmit}
          product={product}
          process="edit"
          isPending={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
