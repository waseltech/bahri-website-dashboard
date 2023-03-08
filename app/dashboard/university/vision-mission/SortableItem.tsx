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

  /**
   * "titleAr": " المعرفية الرائدة ",
    "titleEn": " المعرفية الرائدة ",
    "descriptionAr": "تطمح جامعة بحري إلى أن تصبح المؤسسة المعرفية الرائدة في إفريقيا والعالم العربي.",
     "icon": "icon",
     "seqNo": 1,
    "descriptionEn": "تطمح جامعة بحري إلى أن تصبح المؤسسة المعرفية الرائدة في إفريقيا والعالم العربي."
}
   */

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td>
        <Bars4Icon
          {...attributes}
          {...listeners}
          className="w-4 h-4 hover:cursor-move"
        />
      </td>
      {children}
    </tr>
  );
}
