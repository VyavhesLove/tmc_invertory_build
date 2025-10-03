import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-2 p-4">
      <StatusBadge status="В ремонте" />
      <StatusBadge status="Выдано" />
      <StatusBadge status="Подтвердить ремонт" />
      <StatusBadge status="На складе" />
    </div>
  );
}
