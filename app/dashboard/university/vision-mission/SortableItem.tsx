import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Bars4Icon } from "@heroicons/react/24/outline";

type SortableItemProps = {
  children: React.ReactNode;
  id: string;
};

export function SortableItem({ id, children }: SortableItemProps) {
  // props.id
  // JavaScript

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Bars4Icon className="w-4 h-4 hover:cursor-move" />
      {children}
    </div>
  );
}
