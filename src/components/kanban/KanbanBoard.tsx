import { useEffect } from "react";
import TaskModal from "./TaskModal";
import {
  DndContext,
  PointerSensor,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import api from "../../services/api";
import KanbanColumn from "./kanbanColumn";
import { DragOverlayCard } from "./KanbanCard";
import type {
  Activity,
  KanbanTask,
  Status,
} from "./kanbanTypes";
import {
  COLUMN_ORDER,
  createEmptyColumns,
} from "./utils";
import "./KanbanBoard.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setTasks,
  setSelectedTask,
  setColumns,
  setActivities,
  setActiveTask,
  updateTask,
} from "../../redux/taskSlice";
export default function KanbanBoard() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  // Redux
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(
    (state) => state.tasks.tasks
  );
  const selectedTask = useAppSelector(
    (state) => state.tasks.selectedTask
  );
  const loading = useAppSelector(
    (state) => state.tasks.loading
  );
  const columns = useAppSelector(
  (state) => state.tasks.columns
);
const activeTask = useAppSelector(
  (state) => state.tasks.activeTask
);
  useEffect(() => {
  if (tasks.length > 0) {
    const grouped = createEmptyColumns();
    tasks.forEach((task) => {
      grouped[task.status].push(task);
    });
    dispatch(setColumns(grouped));
  }
}, [tasks, dispatch]);
  async function fetchTasks() { 
    try {
      const res = await api.get("/tasks");
      const tasks: KanbanTask[] =
        res.data.tasks || [];
      const grouped =
        createEmptyColumns();
      const activityList: Activity[] = [];
      tasks.forEach((task) => {
        grouped[task.status].push(task);
        if (task.activity) {
          activityList.push(...task.activity);
        }
      });
      activityList.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );
      dispatch(setActivities(activityList));
      dispatch(setColumns(grouped));
     dispatch(setTasks(tasks));
      if (selectedTask) {
        const updatedTask =
          tasks.find(
            (task) =>
              task._id === selectedTask._id
          );
      if (updatedTask) {
  dispatch(setSelectedTask(updatedTask));
}     }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }
  function findTask(
  id: string
): {
  task: KanbanTask | null;
  column: Status | null;
} {
  for (const column of COLUMN_ORDER) {
    const found = columns[column].find(
      (task) => task._id === id
    );
    if (found) {
      return {
        task: found,
        column,
      };
    }
  }
  return {
    task: null,
    column: null,
  };
}
function handleDragStart(
  event: DragStartEvent
) {
  const id = String(event.active.id);
  const result = findTask(id);
  if (result.task) {
    dispatch(setActiveTask(result.task));
  }
}
function handleDragOver(
  event: DragOverEvent
) {
  const { active, over } = event;
  if (!over) return;
  const activeId = String(active.id);
  const overId = String(over.id);
  const activeResult =
    findTask(activeId);
  if (
    !activeResult.task ||
    !activeResult.column
  )
    return;
  let targetColumn: Status | null = null;
  if (
    COLUMN_ORDER.includes(
      overId as Status
    )
  ) {
    targetColumn =
      overId as Status;
  } else {
    const overResult =
      findTask(overId);
    targetColumn =
      overResult.column;
  }
  if (!targetColumn)
    return;
  if (
    targetColumn ===
    activeResult.column
  )
    return;
 const source = columns[
  activeResult.column!
].filter(
  (task) => task._id !== activeId
);
const destination = [
  ...columns[targetColumn!],
  {
    ...activeResult.task!,
    status: targetColumn!,
  },
];
dispatch(
  setColumns({
    ...columns,
    [activeResult.column!]: source,
    [targetColumn!]: destination,
  })
);
}
async function handleDragEnd(
  event: DragEndEvent
) {
  const { active, over } = event;
  dispatch(setActiveTask(null));
  if (!over) return;
  const activeId = String(active.id);
  const result = findTask(activeId);
  if (
    !result.task ||
    !result.column
  ) {
    return;
  }
  try {
    const res = await api.put(
  `/tasks/${activeId}`,
  {
    status: result.task.status,
  }
);
dispatch(updateTask(res.data.task));
  } catch (err) {
    console.error(err);
    await fetchTasks();
  }
}
if (loading) {
  return (
    <h2>Loading...</h2>
  );
}
return (
  <DndContext
    sensors={sensors}
    collisionDetection={closestCorners}
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDragEnd={handleDragEnd}
  > <div className="kanban">
      {COLUMN_ORDER.map((column) => (

        <KanbanColumn
  key={column}
  title={column}
  tasks={columns[column]}
  onTaskClick={(task) =>
    dispatch(setSelectedTask(task))
  }
/>
      ))}
    </div>
    <DragOverlay>
      {activeTask ? (
        <DragOverlayCard
          task={activeTask}
        />
      ) : null}
    </DragOverlay>
    <TaskModal
  task={selectedTask}
  onClose={() =>
    dispatch(setSelectedTask(null))
  }
  onRefresh={fetchTasks}
/>
  </DndContext>
);
}