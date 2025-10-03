import { Badge } from "@/components/ui/badge";
import { type ItemStatus } from "@shared/schema";

interface StatusBadgeProps {
  status: ItemStatus;
}

const statusColors: Record<ItemStatus, string> = {
  "В ремонте": "bg-chart-3/20 text-chart-3 border-chart-3/30",
  "Выдано": "bg-chart-1/20 text-chart-1 border-chart-1/30",
  "Подтвердить ремонт": "bg-chart-4/20 text-chart-4 border-chart-4/30",
  "На складе": "bg-chart-2/20 text-chart-2 border-chart-2/30",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={`${statusColors[status]} font-medium`}
      data-testid={`badge-status-${status}`}
    >
      {status}
    </Badge>
  );
}
