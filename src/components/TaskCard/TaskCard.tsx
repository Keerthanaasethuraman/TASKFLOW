import "./TaskCard.css";

import {
  Calendar,
  Clock,
  Check,
  Pencil,
  Trash2,
} from "lucide-react";

type TaskCardProps = {
  title: string;
  description: string;
  date: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

function TaskCard({
  title,
  description,
  date,
  time,
  priority,
  completed,
  onComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {

  // ================= DATE FORMAT =================

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  // ================= TIME FORMAT =================

  const formattedTime = time
    ? (() => {
        const [hours, minutes] = time.split(":");
        const hour = Number(hours);

        if (Number.isNaN(hour)) {
          return time;
        }

        const period = hour >= 12 ? "PM" : "AM";
        const displayHour =
          hour % 12 || 12;

        return `${displayHour}:${minutes} ${period}`;
      })()
    : "-";

  return (
    <div
      className={`task-card ${
        completed ? "completed" : ""
      }`}
    >

      {/* ================= TASK INFO ================= */}

      <div className="task-main">

        <div className="task-info">

          <h3>{title}</h3>

          <p className="task-description">
            {description}
          </p>

        </div>

        <span
          className={`priority ${priority.toLowerCase()}`}
        >
          {priority}
        </span>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="task-footer">

        <div className="task-date">

          <span>
            <Calendar size={15} />
            {formattedDate}
          </span>

          <span>
            <Clock size={15} />
            {formattedTime}
          </span>

        </div>

        {/* ================= ACTIONS ================= */}

        <div className="task-actions">

          <button
            className="task-btn"
            onClick={onComplete}
            title={
              completed
                ? "Mark as Todo"
                : "Complete"
            }
          >
            <Check size={18} />
          </button>

          <button
            className="task-btn"
            onClick={onEdit}
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            className="task-btn"
            onClick={onDelete}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskCard;