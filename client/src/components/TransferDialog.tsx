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

interface TransferDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTransfer: (itemId: string, location: string, responsible: string) => void;
}

export function TransferDialog({ item, open, onOpenChange, onTransfer }: TransferDialogProps) {
  const [location, setLocation] = useState("");
  const [responsible, setResponsible] = useState("");

  useEffect(() => {
    if (item) {
      setLocation(item.location || "");
      setResponsible(item.responsible || "");
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onTransfer(item.id, location, responsible);
      onOpenChange(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Передать ТМЦ</DialogTitle>
          <DialogDescription>
            Выберите объект и ответственного для передачи ТМЦ
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Локация (Объект)</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Введите локацию"
                required
                data-testid="input-location"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="responsible">Ответственный</Label>
              <Input
                id="responsible"
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                placeholder="Введите ФИО ответственного"
                required
                data-testid="input-responsible"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" data-testid="button-transfer">
              Передать
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
