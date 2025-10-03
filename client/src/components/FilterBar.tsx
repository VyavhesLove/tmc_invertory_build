import { Button } from "@/components/ui/button";
import { statusOptions, type ItemStatus } from "@shared/schema";

interface FilterBarProps {
  selectedStatus: ItemStatus | "all";
  onStatusChange: (status: ItemStatus | "all") => void;
}

export function FilterBar({ selectedStatus, onStatusChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedStatus === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onStatusChange("all")}
        data-testid="filter-all"
      >
        Все
      </Button>
      {statusOptions.map((status) => (
        <Button
          key={status}
          variant={selectedStatus === status ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(status)}
          data-testid={`filter-${status}`}
        >
          {status}
        </Button>
      ))}
    </div>
  );
}
