import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { ComponentProps, FC, ReactNode } from "react";

interface CommonModalProps extends ComponentProps<typeof Dialog> {
  title?: string;
  children: ReactNode;
  description?: string;
}
export const CommonModal: FC<CommonModalProps> = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  children,
  ...dialog
}) => {
  return (
    <Dialog {...dialog} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
