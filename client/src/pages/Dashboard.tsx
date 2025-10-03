import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { InventoryTable } from "@/components/InventoryTable";
import { AddItemDialog } from "@/components/AddItemDialog";
import { EditItemDialog } from "@/components/EditItemDialog";
import { TransferDialog } from "@/components/TransferDialog";
import { BrigadeDialog } from "@/components/BrigadeDialog";
import { RepairDialog } from "@/components/RepairDialog";
import { ReturnDialog } from "@/components/ReturnDialog";
import { FilterBar } from "@/components/FilterBar";
import { type InventoryItem, type ItemStatus } from "@shared/schema";

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [items, setItems] = useState<InventoryItem[]>([
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
    {
      id: "3",
      type: "Принтер",
      brand: "HP",
      model: "LaserJet Pro",
      name: "Принтер HP LaserJet Pro",
      serialNumber: "HP-LJ-789",
      status: "На складе",
      responsible: null,
      location: "Склад",
      brigade: null,
      repairReason: null,
      repairComment: null,
      createdAt: new Date(),
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | "all">("all");
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [transferItem, setTransferItem] = useState<InventoryItem | null>(null);
  const [brigadeItem, setBrigadeItem] = useState<InventoryItem | null>(null);
  const [repairItem, setRepairItem] = useState<InventoryItem | null>(null);
  const [returnItem, setReturnItem] = useState<InventoryItem | null>(null);

  const filteredItems = selectedStatus === "all" 
    ? items 
    : items.filter(item => item.status === selectedStatus);

  const handleAddItem = (newItem: any) => {
    const item: InventoryItem = {
      ...newItem,
      id: Date.now().toString(),
      responsible: null,
      location: null,
      brigade: null,
      repairReason: null,
      repairComment: null,
      createdAt: new Date(),
    };
    setItems([...items, item]);
    console.log("Item added:", item);
  };

  const handleEditItem = (updatedItem: InventoryItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    console.log("Item edited:", updatedItem);
  };

  const handleTransfer = (itemId: string, location: string, responsible: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, location, responsible, status: "Выдано" as ItemStatus }
        : item
    ));
    console.log("Item transferred:", { itemId, location, responsible });
  };

  const handleAssignBrigade = (itemId: string, brigade: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, brigade }
        : item
    ));
    console.log("Brigade assigned:", { itemId, brigade });
  };

  const handleSendToRepair = (itemId: string, reason: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, status: "В ремонте" as ItemStatus, repairReason: reason }
        : item
    ));
    console.log("Sent to repair:", { itemId, reason });
  };

  const handleReturnFromRepair = (itemId: string, comment: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, status: "Подтвердить ремонт" as ItemStatus, repairComment: comment }
        : item
    ));
    console.log("Returned from repair:", { itemId, comment });
  };

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar onLogout={onLogout} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b border-border">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Учет ТМЦ</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Управление товарно-материальными ценностями
                </p>
              </div>
              <AddItemDialog onAdd={handleAddItem} />
            </div>

            <FilterBar 
              selectedStatus={selectedStatus} 
              onStatusChange={setSelectedStatus}
            />

            <InventoryTable
              items={filteredItems}
              onEdit={(item) => setEditItem(item)}
              onTransfer={(item) => setTransferItem(item)}
              onAssignBrigade={(item) => setBrigadeItem(item)}
              onSendToRepair={(item) => setRepairItem(item)}
              onReturnFromRepair={(item) => setReturnItem(item)}
            />
          </main>
        </div>

        <EditItemDialog
          item={editItem}
          open={!!editItem}
          onOpenChange={(open) => !open && setEditItem(null)}
          onSave={handleEditItem}
        />

        <TransferDialog
          item={transferItem}
          open={!!transferItem}
          onOpenChange={(open) => !open && setTransferItem(null)}
          onTransfer={handleTransfer}
        />

        <BrigadeDialog
          item={brigadeItem}
          open={!!brigadeItem}
          onOpenChange={(open) => !open && setBrigadeItem(null)}
          onAssign={handleAssignBrigade}
        />

        <RepairDialog
          item={repairItem}
          open={!!repairItem}
          onOpenChange={(open) => !open && setRepairItem(null)}
          onSendToRepair={handleSendToRepair}
        />

        <ReturnDialog
          item={returnItem}
          open={!!returnItem}
          onOpenChange={(open) => !open && setReturnItem(null)}
          onReturn={handleReturnFromRepair}
        />
      </div>
    </SidebarProvider>
  );
}
