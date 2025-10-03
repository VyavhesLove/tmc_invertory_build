import { useState } from "react";
import { BrigadeDialog } from "../BrigadeDialog";
import { Button } from "@/components/ui/button";
import { type InventoryItem } from "@shared/schema";

export default function BrigadeDialogExample() {
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

  const handleAssign = (itemId: string, brigade: string) => {
    console.log("Assign to brigade:", { itemId, brigade });
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Открыть диалог бригады</Button>
      <BrigadeDialog
        item={mockItem}
        open={open}
        onOpenChange={setOpen}
        onAssign={handleAssign}
      />
    </div>
  );
}
