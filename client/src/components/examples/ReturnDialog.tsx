import { useState } from "react";
import { ReturnDialog } from "../ReturnDialog";
import { Button } from "@/components/ui/button";
import { type InventoryItem } from "@shared/schema";

export default function ReturnDialogExample() {
  const [open, setOpen] = useState(false);
  
  const mockItem: InventoryItem = {
    id: "2",
    type: "Монитор",
    brand: "Samsung",
    model: "S27A600",
    name: "Монитор Samsung 27\"",
    serialNumber: "SM27-A600-042",
    status: "В ремонте",
    responsible: null,
    location: "Склад",
    brigade: null,
    repairReason: "Не включается",
    repairComment: null,
    createdAt: new Date(),
  };

  const handleReturn = (itemId: string, comment: string) => {
    console.log("Return from repair:", { itemId, comment });
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Открыть диалог возврата</Button>
      <ReturnDialog
        item={mockItem}
        open={open}
        onOpenChange={setOpen}
        onReturn={handleReturn}
      />
    </div>
  );
}
