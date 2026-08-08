import {
  useDroppable,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import KanbanCard from "./KanbanCard";

import type {
  KanbanTask,
  Status,
} from "./kanbanTypes";

type Props = {
  title: Status;
  tasks: KanbanTask[];
  onTaskClick: (task: KanbanTask) => void;
};

export default function KanbanColumn({
  title,
  tasks,
  onTaskClick,
}: Props) {

  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: title,
  });

  return (

    <div className="kanban-column">

      <h2 className="kanban-title">
        {title}
      </h2>

      <div
        ref={setNodeRef}
        className={`kanban-body ${
          isOver
            ? "kanban-body-over"
            : ""
        }`}
      >

        <SortableContext
          items={tasks.map(
            (task) => task._id
          )}
          strategy={
            verticalListSortingStrategy
          }
        >

          {tasks.length === 0 ? (

            <div className="empty-column">
              Drop Tasks Here
            </div>

          ) : (

            tasks.map((task) => (

              <KanbanCard
                key={task._id}
                task={task}
                onClick={onTaskClick}
              />

            ))

          )}

        </SortableContext>

      </div>

    </div>

  );

}