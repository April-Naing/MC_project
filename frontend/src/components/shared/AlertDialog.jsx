import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
const AlertDialog = ({
  openDialog,
  closeDialog,
  dialogDescription,
  className,
  cancelClickHandler,
  confirmClickHandler,
}) => {
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pt-4">
            {dialogDescription}
          </DialogDescription>
          <div className="flex justify-end pt-8">
            <Button
              className={`mx-4 bg-cyan-600 hover:bg-cyan-500 ${className}`}
              onClick={cancelClickHandler}
            >
              Cancel
            </Button>
            <Button
              className=" bg-red-600 hover:bg-red-500 ${className}"
              onClick={confirmClickHandler}
            >
              Confirm
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
