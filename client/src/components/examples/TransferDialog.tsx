import { useState } from "react";
import { TransferDialog } from "../TransferDialog";
import { Button } from "@/components/ui/button";
import { type InventoryItem } from "@shared/schema";

export default function TransferDialogExample() {
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

  const handleTransfer = (itemId: string, location: string, responsible: string) => {
    console.log("Transfer:", { itemId, location, responsible });
  };

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Открыть диалог передачи</Button>
      <TransferDialog
        item={mockItem}
        open={open}
        onOpenChange={setOpen}
        onTransfer={handleTransfer}
      />
    </div>
  );
}
