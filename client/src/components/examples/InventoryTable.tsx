import { InventoryTable } from "../InventoryTable";
import { type InventoryItem } from "@shared/schema";

export default function InventoryTableExample() {
  const mockItems: InventoryItem[] = [
    {
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
    },
    {
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
    },
  ];

  const handleEdit = (item: InventoryItem) => console.log("Edit:", item.id);
  const handleTransfer = (item: InventoryItem) => console.log("Transfer:", item.id);
  const handleAssignBrigade = (item: InventoryItem) => console.log("Assign brigade:", item.id);
  const handleSendToRepair = (item: InventoryItem) => console.log("Send to repair:", item.id);
  const handleReturnFromRepair = (item: InventoryItem) => console.log("Return from repair:", item.id);

  return (
    <div className="p-6">
      <InventoryTable
        items={mockItems}
        onEdit={handleEdit}
        onTransfer={handleTransfer}
        onAssignBrigade={handleAssignBrigade}
        onSendToRepair={handleSendToRepair}
        onReturnFromRepair={handleReturnFromRepair}
      />
    </div>
  );
}
