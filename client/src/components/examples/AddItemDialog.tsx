import { AddItemDialog } from "../AddItemDialog";

export default function AddItemDialogExample() {
  const handleAdd = (item: any) => {
    console.log("Add item:", item);
  };

  return (
    <div className="p-4">
      <AddItemDialog onAdd={handleAdd} />
    </div>
  );
}
