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
import { useCreatePromotion } from "../api/create-promotion";
import PromotionForm from "../components/PromotionForm";
import { zodResolver } from "@hookform/resolvers/zod";
import promotionSchema from "../schema/promotionc-schema";

const CreatePromotion = ({ isOpen, setIsOpen }) => {
  const form = useForm({
    resolver: zodResolver(promotionSchema),
  });

  const { mutate: createPromotion, isPending: isCreating } =
    useCreatePromotion();

  const onSubmit = (data) => {
    createPromotion(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["promotions"],
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
          <DialogTitle className="ms-2">Create Promotion</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <PromotionForm
          form={form}
          onSubmit={onSubmit}
          process="create"
          isPending={isCreating}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePromotion;
