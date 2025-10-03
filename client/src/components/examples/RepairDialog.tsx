import { useState } from "react";
import { RepairDialog } from "../RepairDialog";
import { Button } from "@/components/ui/button";
import { type InventoryItem } from "@shared/schema";

export default function RepairDialogExample() {
  const [open, setOpen] = useState(false);
  
  const mockItem: InventoryItem = {
    id: "1",
    type: "Ноутбук",
    brand: "Dell",
    model: "Latitude 5520",
    name: "Ноутбук Dell Latitude 5520",
    serialNumber: "DL5520-001",
    status: "Выдано",
    responsible: "Иванов И.И.",
    location: "Офис Москва",
    brigade: null,
    repairReason: null,
    repairComment: null,
    createdAt: new Date(),
  };

  const handleSendToRepair = (itemId: string, reason: string) => {
    console.log("Send to repair:", { itemId, reason });
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Открыть диалог ремонта</Button>
      <RepairDialog
        item={mockItem}
        open={open}
        onOpenChange={setOpen}
        onSendToRepair={handleSendToRepair}
      />
    </div>
  );
}
