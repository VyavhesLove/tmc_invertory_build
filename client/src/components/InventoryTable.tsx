import { useState } from "react";
import { MoreVertical, Eye, EyeOff } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "./StatusBadge";
import { type InventoryItem } from "@shared/schema";

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onTransfer: (item: InventoryItem) => void;
  onAssignBrigade: (item: InventoryItem) => void;
  onSendToRepair: (item: InventoryItem) => void;
  onReturnFromRepair: (item: InventoryItem) => void;
}

type ColumnKey = "id" | "name" | "serialNumber" | "brand" | "status" | "responsible" | "location";

const defaultColumns: Record<ColumnKey, boolean> = {
  id: true,
  name: true,
  serialNumber: true,
  brand: true,
  status: true,
  responsible: true,
  location: true,
};

export function InventoryTable({
  items,
  onEdit,
  onTransfer,
  onAssignBrigade,
  onSendToRepair,
  onReturnFromRepair,
}: InventoryTableProps) {
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns);

  const toggleColumn = (column: ColumnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" data-testid="button-column-toggle">
              <Eye className="h-4 w-4 mr-2" />
              Колонки
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Показать колонки</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={visibleColumns.id}
              onCheckedChange={() => toggleColumn("id")}
            >
              ID
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.name}
              onCheckedChange={() => toggleColumn("name")}
            >
              Наименование
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.serialNumber}
              onCheckedChange={() => toggleColumn("serialNumber")}
            >
              Серийный номер
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.brand}
              onCheckedChange={() => toggleColumn("brand")}
            >
              Бренд
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.status}
              onCheckedChange={() => toggleColumn("status")}
            >
              Статус
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.responsible}
              onCheckedChange={() => toggleColumn("responsible")}
            >
              Ответственный
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visibleColumns.location}
              onCheckedChange={() => toggleColumn("location")}
            >
              Локация
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.id && <TableHead className="w-20">ID</TableHead>}
              {visibleColumns.name && <TableHead>Наименование</TableHead>}
              {visibleColumns.serialNumber && <TableHead>Серийный номер</TableHead>}
              {visibleColumns.brand && <TableHead>Бренд</TableHead>}
              {visibleColumns.status && <TableHead>Статус</TableHead>}
              {visibleColumns.responsible && <TableHead>Ответственный</TableHead>}
              {visibleColumns.location && <TableHead>Локация</TableHead>}
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={Object.values(visibleColumns).filter(Boolean).length + 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  Нет данных
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item.id} data-testid={`row-item-${index}`}>
                  {visibleColumns.id && (
                    <TableCell className="font-mono text-sm" data-testid={`text-id-${index}`}>
                      #{index + 1}
                    </TableCell>
                  )}
                  {visibleColumns.name && <TableCell data-testid={`text-name-${index}`}>{item.name}</TableCell>}
                  {visibleColumns.serialNumber && (
                    <TableCell className="font-mono text-sm" data-testid={`text-serial-${index}`}>
                      {item.serialNumber}
                    </TableCell>
                  )}
                  {visibleColumns.brand && <TableCell data-testid={`text-brand-${index}`}>{item.brand}</TableCell>}
                  {visibleColumns.status && (
                    <TableCell>
                      <StatusBadge status={item.status as any} />
                    </TableCell>
                  )}
                  {visibleColumns.responsible && (
                    <TableCell data-testid={`text-responsible-${index}`}>{item.responsible || "-"}</TableCell>
                  )}
                  {visibleColumns.location && (
                    <TableCell data-testid={`text-location-${index}`}>{item.location || "-"}</TableCell>
                  )}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-actions-${index}`}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(item)} data-testid="action-edit">
                          Редактировать ТМЦ
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onTransfer(item)} data-testid="action-transfer">
                          Передать ТМЦ
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onAssignBrigade(item)} data-testid="action-brigade">
                          Передать в работу
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onSendToRepair(item)} data-testid="action-repair">
                          Отправить в сервис
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onReturnFromRepair(item)} data-testid="action-return">
                          Вернуть из сервиса
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
