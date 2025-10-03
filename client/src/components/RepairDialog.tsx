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

interface RepairDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendToRepair: (itemId: string, reason: string) => void;
}

export function RepairDialog({ item, open, onOpenChange, onSendToRepair }: RepairDialogProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onSendToRepair(item.id, reason);
      setReason("");
      onOpenChange(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Отправить в сервис (ремонт)</DialogTitle>
          <DialogDescription>
            Укажите причину отправки в ремонт
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Причина ремонта</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Опишите причину отправки в ремонт"
                required
                rows={4}
                data-testid="input-repair-reason"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" data-testid="button-send-repair">
              Отправить в сервис
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
