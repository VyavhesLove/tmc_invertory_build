import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type InventoryItem } from "@shared/schema";

interface BrigadeDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (itemId: string, brigade: string) => void;
}

export function BrigadeDialog({ item, open, onOpenChange, onAssign }: BrigadeDialogProps) {
  const [brigade, setBrigade] = useState("");

  useEffect(() => {
    if (item) {
      setBrigade(item.brigade || "");
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onAssign(item.id, brigade);
      onOpenChange(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Передать в работу</DialogTitle>
          <DialogDescription>
            Выберите бригаду для передачи ТМЦ в работу
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="brigade">Бригада</Label>
              <Input
                id="brigade"
                value={brigade}
                onChange={(e) => setBrigade(e.target.value)}
                placeholder="Введите название бригады"
                required
                data-testid="input-brigade"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" data-testid="button-assign">
              Назначить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
