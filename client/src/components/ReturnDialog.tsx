import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { type InventoryItem } from "@shared/schema";

interface ReturnDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReturn: (itemId: string, comment: string) => void;
}

export function ReturnDialog({ item, open, onOpenChange, onReturn }: ReturnDialogProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onReturn(item.id, comment);
      setComment("");
      onOpenChange(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Вернуть из сервиса</DialogTitle>
          <DialogDescription>
            Добавьте комментарий о возврате из ремонта
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Опишите результаты ремонта"
                required
                rows={4}
                data-testid="input-return-comment"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" data-testid="button-return">
              Вернуть из сервиса
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
