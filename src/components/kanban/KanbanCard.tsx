import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import type { KanbanTask } from "./kanbanTypes";
type Props = {
  task: KanbanTask;
  onClick?: (task: KanbanTask) => void;
};
function CardContent({ task }: Props) {
  return (
    <div className="kanban-card">

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <div className="kanban-card-footer">

        <span
          className={`priority priority-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span className="due-date">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}

      </div>

    </div>
  );
}

export function DragOverlayCard({
  task,
}: Props) {
  return <CardContent task={task} />;
}
export default function KanbanCard({
  task,
  onClick,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    cursor: "grab",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick?.(task)}
    >
      <CardContent task={task} />
    </div>
  );
}