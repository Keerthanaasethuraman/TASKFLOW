import { useEffect, useMemo, useState } from "react";

import api from "../../services/api";

import TaskForm from "../../features/TaskForm/TaskForm";

import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";

import {
  setTasks,
  updateTask,
  deleteTask,
  setLoading,
} from "../../redux/taskSlice";

import { setProjects } from "../../redux/projectSlice";

import type { KanbanTask } from "../../components/kanban/kanbanTypes";

import "./TodaysSchedule.css";

type FormTask = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  date: string;
  time: string;
  project?: string;
};

export default function TodaysSchedule() {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(
    (state) => state.tasks.tasks
  );

  const [showTaskForm, setShowTaskForm] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<KanbanTask | null>(null);

  // ================= LOAD PROJECTS =================

  useEffect(() => {
  fetchProjects();
  fetchTasks();
}, []);
  async function fetchProjects() {
    try {
      const res = await api.get("/projects");

      dispatch(
        setProjects(res.data.projects)
      );
    } catch (err) {
      console.error(
        "Failed to fetch projects:",
        err
      );
    }
  }
  async function fetchTasks() {
  try {
    dispatch(setLoading(true));

    const res = await api.get("/tasks");

    dispatch(setTasks(res.data.tasks));
  } catch (err) {
    console.error(
      "Failed to fetch tasks:",
      err
    );
  } finally {
    dispatch(setLoading(false));
  }
}

  // ================= TODAY'S TASKS =================

  const todaysTasks = useMemo(() => {
  const now = new Date();

  const today =
    `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}`;

  return tasks
    .filter((task) => {
      if (!task.dueDate) return false;

      return (
        task.dueDate.split("T")[0] === today
      );
    })
    .sort((a, b) => {
      const timeA = a.dueTime || "";
      const timeB = b.dueTime || "";

      return timeA.localeCompare(timeB);
    });
}, [tasks]);

  // ================= CREATE / EDIT =================

  async function saveTask(task: FormTask) {
    try {
      console.log(
        "TODAY'S SCHEDULE SAVE:",
        task
      );

      // ================= EDIT =================

      if (editingTask) {
       const res = await api.put(
  `/tasks/${editingTask._id}`,
  {
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.date,
    dueTime: task.time,

    ...(task.project
      ? { project: task.project }
      : {}),
  }
);
        dispatch(
          updateTask(res.data.task)
        );
      }

      // ================= CREATE =================

     else {
  const res = await api.post(
  "/tasks",
  {
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.date,
    dueTime: task.time,

    ...(task.project
      ? { project: task.project }
      : {}),
  }
);

        dispatch(
          setTasks([
            ...tasks,
            res.data.task,
          ])
        );
      }

      setShowTaskForm(false);
      setEditingTask(null);

    } catch (error) {
      console.error(
        "Failed to save task:",
        error
      );
    }
  }

  // ================= EDIT =================

  function handleEdit(task: KanbanTask) {
    setEditingTask(task);
    setShowTaskForm(true);
  }

  // ================= DELETE =================

  async function handleDelete(
    taskId: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/tasks/${taskId}`
      );

      dispatch(
        deleteTask(taskId)
      );

    } catch (error) {
      console.error(
        "Failed to delete task:",
        error
      );
    }
  }
// ================= COMPLETE / TODO =================

async function completeTask(taskId: string) {
  const task = tasks.find(
    (task) => task._id === taskId
  );

  if (!task) return;

  const newStatus =
    task.status === "Done"
      ? "Todo"
      : "Done";

  try {
    const res = await api.put(
      `/tasks/${taskId}`,
      {
        status: newStatus,
      }
    );

    dispatch(
      updateTask(res.data.task)
    );
  } catch (error) {
    console.error(
      "Failed to update task status:",
      error
    );
  }
}
  return (
    <div className="todays-schedule">

      {/* ================= HEADER ================= */}

      <div className="todays-schedule-header">

        <div>
          <h1>Today's Schedule</h1>

          <p>
            Manage your tasks scheduled for today
          </p>
        </div>

        <button
          className="add-task-btn"
          onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}
        >
          + Add Task
        </button>

      </div>

      {/* ================= TASK FORM ================= */}

      {showTaskForm && (
        <div className="schedule-form">

          <TaskForm
            onSaveTask={saveTask}

            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}

            initialTask={
              editingTask
                ? {
                    title:
                      editingTask.title,

                    description:
                      editingTask.description,

                    date:
                      editingTask.dueDate
                        ? editingTask.dueDate.split(
                            "T"
                          )[0]
                        : "",

                    time:
                      editingTask.dueTime || "",

                    priority:
                      editingTask.priority,

                    project:
                      typeof editingTask.project ===
                      "string"
                        ? editingTask.project
                        : "",
                  }
                : null
            }
          />

        </div>
      )}

      {/* ================= TASK LIST ================= */}

      <div className="schedule-list">

        {todaysTasks.length === 0 ? (

          <div className="empty-schedule">

            <h3>
              No tasks scheduled for today
            </h3>

            <p>
              Tasks with today's due date
              will appear here.
            </p>

          </div>

        ) : (

          todaysTasks.map((task) => (

            <div
              className="schedule-task"
              key={task._id}
            >

              {/* TIME */}

              <div className="schedule-time">
                {task.dueTime || "--:--"}
              </div>

              {/* DETAILS */}

              <div className="schedule-task-info">

                <h3>{task.title}</h3>

                <p>
                  {task.description ||
                    "No description"}
                </p>

                <div className="schedule-meta">

  <span>
    {task.priority}
  </span>

  <button
    className={`status-button ${
      task.status === "Done"
        ? "completed"
        : ""
    }`}
    onClick={() =>
      completeTask(task._id)
    }
  >
    {task.status === "Done"
      ? "Done"
      : "Todo"}
  </button>

</div>

              </div>

              {/* ACTIONS */}

              <div className="schedule-actions">

                <button
                  onClick={() =>
                    handleEdit(task)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      task._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}