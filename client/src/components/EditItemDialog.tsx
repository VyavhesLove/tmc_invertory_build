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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions, type InventoryItem, type ItemStatus } from "@shared/schema";

interface EditItemDialogProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: InventoryItem) => void;
}

export function EditItemDialog({ item, open, onOpenChange, onSave }: EditItemDialogProps) {
  const [formData, setFormData] = useState<Partial<InventoryItem>>({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onSave({ ...item, ...formData } as InventoryItem);
      onOpenChange(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Редактировать ТМЦ</DialogTitle>
          <DialogDescription>
            Измените информацию о товарно-материальной ценности
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Тип</Label>
              <Input
                id="edit-type"
                value={formData.type || ""}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
                data-testid="input-edit-type"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-brand">Бренд</Label>
              <Input
                id="edit-brand"
                value={formData.brand || ""}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
                data-testid="input-edit-brand"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-model">Модель</Label>
              <Input
                id="edit-model"
                value={formData.model || ""}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                required
                data-testid="input-edit-model"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Наименование</Label>
              <Input
                id="edit-name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                data-testid="input-edit-name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-serialNumber">Серийный номер</Label>
              <Input
                id="edit-serialNumber"
                value={formData.serialNumber || ""}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                required
                data-testid="input-edit-serial"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" data-testid="button-save-edit">
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
