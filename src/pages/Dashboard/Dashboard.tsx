import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  FolderKanban,
  ListTodo,
  Plus,
} from "lucide-react";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import SearchBar from "../../components/Searchbar/Searchbar";
import StatCard from "../../components/StatCard/StatCard";
import TaskCard from "../../components/TaskCard/TaskCard";
import TaskForm from "../../features/TaskForm/TaskForm";
import "./Dashboard.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setTasks,
  setLoading,
  deleteTask as deleteTaskAction,
  updateTask,
} from "../../redux/taskSlice";
import { setProjects } from "../../redux/projectSlice";
import api from "../../services/api";
export default function Dashboard() {
 const dispatch = useAppDispatch();
const tasks = useAppSelector(
  (state) => state.tasks.tasks
);
const user = useAppSelector(
  (state) => state.auth.user
);
const firstName =
  user?.name?.split(" ")[0] || "User";
  const [search, setSearch] = useState("");
  const [filter,  ] = useState<
    "All" | "Pending" | "Completed"
  >("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);
 useEffect(() => {
  fetchTasks();
  fetchProjects();
}, []);
async function fetchTasks() {
  try {
    dispatch(setLoading(true));
    const res = await api.get("/tasks");
    dispatch(setTasks(res.data.tasks));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
}
async function fetchProjects() {
  try {
    const res = await api.get("/projects");
    dispatch(setProjects(res.data.projects));
  } catch (err) {
    console.error("Failed to fetch projects:", err);
  }
}
 const filteredTasks = useMemo(() => {
  return tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.description
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Completed"
        ? task.status === "Done"
        : task.status !== "Done";
    return matchesSearch && matchesFilter;
  });
}, [tasks, search, filter]);
async function saveTask(task: {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  date: string;
  time: string;
  project?: string;
}) {
  console.log("DASHBOARD SAVE TASK", task);
  try {
    // ================= EDIT TASK =================
    if (editingIndex !== null) {
      const existingTask = tasks[editingIndex];
      if (!existingTask?._id) {
        console.error("Task ID not found");
        return;
      }
      console.log(
        "UPDATING TASK:",
        existingTask._id
      );
      const res = await api.put(
        `/tasks/${existingTask._id}`,
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
      console.log(
        "UPDATE RESPONSE:",
        res.data
      );
      dispatch(
        updateTask(res.data.task)
      );
    }
    // ================= CREATE TASK =================
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
    // ================= CLOSE MODAL =================
    setModalOpen(false);
    setEditingIndex(null);
  } catch (error) {
    console.error(
      "Failed to save task:",
      error
    );
  }
}
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
    dispatch(updateTask(res.data.task));
  } catch (error) {
    console.error(
      "Failed to update task status:",
      error
    );
  }
}
async function deleteTask(taskId: string) {
  try {
    await api.delete(`/tasks/${taskId}`);
    dispatch(
      deleteTaskAction(taskId)
    );
  } catch (error) {
    console.error(
      "Failed to delete task:",
      error
    );
  }
}
function editTask(taskId: string) {
  const index = tasks.findIndex(
    (task) => task._id === taskId
  );
  if (index === -1) return;
  setEditingIndex(index);
  setModalOpen(true);
}
const completedTasks =
  tasks.filter(
    (task) => task.status === "Done"
  ).length;
const pendingTasks =
  tasks.filter(
    (task) => task.status !== "Done"
  ).length;
  const today = new Date().toISOString().split("T")[0];
const todaysTasks = tasks.filter(
  (task) =>
    task.dueDate &&
    task.dueDate.split("T")[0] === today
).length;
  const stats = [
    {
      title: "Completed",
      value: completedTasks,
      subtitle: "Tasks Finished",
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      value: pendingTasks,
      subtitle: "Tasks Remaining",
      icon: Clock3,
    },
    {
      title: "Today's Tasks",
      value: todaysTasks,
      subtitle: "Scheduled Today",
      icon: ListTodo,
    },
    {
      title: "Projects",
      value: 3,
      subtitle: "Active Projects",
      icon: FolderKanban,
    },
  ];
return (
  <>
    {/* ================= HEADER ================= */}
<section className="dashboard-header">
  <div className="header-left">
    <span className="welcome-text">
      Welcome Back 👋
    </span>
    <h1>{firstName}</h1>
    <p>
      Stay productive and make today count.
    </p>
  </div>
  <div className="header-right">
    <SearchBar
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <Button
      onClick={() => {
        setEditingIndex(null);
        setModalOpen(true);
      }}
    >
      <Plus size={18} />
      Add Task
    </Button>
  </div>
</section>
{/* ================= STATS ================= */}
    <section className="stats-grid">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
        />
      ))}
    </section>
    {/* ================= CONTENT ================= */}
    <section className="dashboard-content">
      {/* LEFT */}
      <div className="dashboard-left">
        <div className="task-section">
          <div className="task-header">
            <h2>My Tasks</h2>
            <span>{filteredTasks.length} Tasks</span>
          </div>
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <h3>No Tasks</h3>
              <p>Create your first task.</p>
            </div>
          ) : (
         <div className="task-grid">
  {filteredTasks.map((task) => (
    <TaskCard
      key={task._id}
      title={task.title}
      description={task.description}
      date={task.dueDate || "-"}
      time={task.dueTime || "-"}
      priority={task.priority}
      completed={task.status === "Done"}
      onComplete={() => completeTask(task._id)}
      onEdit={() => editTask(task._id)}
      onDelete={() => deleteTask(task._id)}
    />
  ))}
</div>
)}
</div>
</div>
{/* RIGHT */}
</section>
<Modal
open={modalOpen}
title={
editingIndex !== null
? "Edit Task"
: "Create New Task"
}
onClose={() => {
setModalOpen(false);
setEditingIndex(null);
}}
>
 <TaskForm
  onSaveTask={saveTask}
  onCancel={() => {
    setModalOpen(false);
    setEditingIndex(null);
  }}
  initialTask={
    editingIndex !== null
      ? {
          title: tasks[editingIndex].title,
          description: tasks[editingIndex].description,
          date: tasks[editingIndex].dueDate || "",
          time: tasks[editingIndex].dueTime || "",
          priority: tasks[editingIndex].priority,
        }
      : null
  }
/>
</Modal>
</>
);
}