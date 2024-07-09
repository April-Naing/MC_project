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
import PromotionForm from "../components/PromotionForm";
import { zodResolver } from "@hookform/resolvers/zod";
import promotionSchema from "../schema/promotionc-schema";
import { useEditPromotion } from "../api/edit-promotion";
import { useGetPromotionById } from "../api/get-promotions";
import IsLoading from "@/components/shared/IsLoading";

const EditPromotion = ({ isOpen, setIsOpen, promotionId }) => {
  const form = useForm({
    resolver: zodResolver(promotionSchema),
  });

  const { data: promotionData, isLoading: isGettingData } =
    useGetPromotionById(promotionId);

  const promotion = promotionData?.data?.data;

  const { mutate: editPromotionMutation, isPending: isEditing } =
    useEditPromotion();

  const onSubmit = (data) => {
    editPromotionMutation(
      { id: promotionId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["promotions"],
          });
          toast.success("Updating success");
          setIsOpen();
        },
        onError: (error) => {
          toast.error("Updating fail" + error.message);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="ms-2">Edit Promotion</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {isGettingData && <IsLoading />}
        {!isGettingData && (
          <PromotionForm
            form={form}
            onSubmit={onSubmit}
            process="edit"
            promotion={promotion}
            isPending={isEditing}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditPromotion;
