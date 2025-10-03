import { useState } from "react";
import { FilterBar } from "../FilterBar";
import { type ItemStatus } from "@shared/schema";

export default function FilterBarExample() {
  const [selectedStatus, setSelectedStatus] = useState<ItemStatus | "all">("all");

  return (
    <div className="p-4">
      <FilterBar selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      <p className="mt-4 text-sm text-muted-foreground">
        Выбранный фильтр: {selectedStatus}
      </p>
    </div>
  );
}
