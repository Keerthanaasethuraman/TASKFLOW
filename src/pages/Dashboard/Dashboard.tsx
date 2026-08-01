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
import NextUp from "../../components/NextUp/NextUp";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import SearchBar from "../../components/Searchbar/Searchbar";
import StatCard from "../../components/StatCard/StatCard";
import TaskCard from "../../components/TaskCard/TaskCard";
import TodaySchedule from "../../components/TodaySchedule/TodaySchedule";
import TaskForm from "../../features/TaskForm/TaskForm";

import "./Dashboard.css";

type Task = {
  title: string;
  description: string;
  date: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        title: "Design Dashboard UI",
        description: "Finish the premium dashboard layout.",
        date: "Today",
        time: "2:00 PM",
        priority: "High",
        completed: false,
      },
      {
        title: "Connect Backend API",
        description: "Integrate Express and MongoDB.",
        date: "Tomorrow",
        time: "11:00 AM",
        priority: "Medium",
        completed: false,
      },
    ];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Completed"
  >("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] =
    useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
          ? task.completed
          : !task.completed;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  function saveTask(task: Omit<Task, "completed">) {
    if (editingIndex !== null) {
      const updated = [...tasks];

      updated[editingIndex] = {
        ...task,
        completed: updated[editingIndex].completed,
      };

      setTasks(updated);
    } else {
      setTasks([
        ...tasks,
        {
          ...task,
          completed: false,
        },
      ]);
    }

    setModalOpen(false);
    setEditingIndex(null);
  }

  function completeTask(index: number) {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  }

  function deleteTask(index: number) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function editTask(index: number) {
    setEditingIndex(index);
    setModalOpen(true);
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

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
      value: tasks.length,
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
  <div className="dashboard">

    {/* ================= HEADER ================= */}

    <section className="dashboard-header">

      <div className="header-left">

        <span className="welcome-text">
          Welcome Back 👋
        </span>

        <h1>Keerthana</h1>

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

              {filteredTasks.map((task, index) => (

                <TaskCard
                  key={index}
                  title={task.title}
                  description={task.description}
                  date={task.date}
                  time={task.time}
                  priority={task.priority}
                  completed={task.completed}
                  onComplete={() => completeTask(index)}
                  onEdit={() => editTask(index)}
                  onDelete={() => deleteTask(index)}
                />

              ))}

            </div>

          )}

        </div>

      </div>

      {/* RIGHT */}

      <div className="dashboard-right">

        <NextUp
          title="Design Dashboard UI"
          description="Finish premium redesign."
          time="2:00 PM"
          priority="High"
        />

        <TodaySchedule />

        <ProgressBar
          label="Today's Progress"
          value={completedTasks}
          total={tasks.length || 1}
        />

      </div>

    </section>
          {/* ================= MODAL ================= */}

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
                  date: tasks[editingIndex].date,
                  time: tasks[editingIndex].time,
                  priority: tasks[editingIndex].priority,
                }
              : null
          }
        />
      </Modal>

    </div>
  );
}