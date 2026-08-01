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
  return (
    <div className={`task-card ${completed ? "completed" : ""}`}>
      <div className="task-header">
        <div>
          <h3 className="task-title">{title}</h3>

          <p className="task-description">
            {description}
          </p>
        </div>

        <span className={`priority ${priority.toLowerCase()}`}>
          {priority}
        </span>
      </div>

      <div className="task-footer">
        <div className="task-date">
          <span>
            <Calendar size={15} />
            {date}
          </span>

          <span>
            <Clock size={15} />
            {time}
          </span>
        </div>

        <div className="task-actions">
          <button
            className="task-btn"
            onClick={onComplete}
            title="Complete"
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