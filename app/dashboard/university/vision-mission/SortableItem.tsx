import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      <div className="m-3">{children}</div>
    </div>
  );
}
