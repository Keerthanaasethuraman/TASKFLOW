import { useEffect, useState } from "react";
import "./TaskModal.css";
import api from "../../services/api";

import type { KanbanTask } from "./kanbanTypes";

import CommentPanel from "./CommentPanel";
import ActivityTimeline from "./ActivityTimeline";
import { useAppDispatch } from "../../redux/hooks";
import { updateTask } from "../../redux/taskSlice";

type User = {
  _id: string;
  name: string;
  email: string;
};

type Props = {
  task: KanbanTask | null;
  onClose: () => void;
  onRefresh: () => void;
};

export default function TaskModal({
  task,
  onClose,
  onRefresh,
}: Props) {
  const dispatch = useAppDispatch();

  const [dueDate, setDueDate] = useState(
    task?.dueDate
      ? task.dueDate.split("T")[0]
      : ""
  );

  const [dueTime, setDueTime] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [assignedUser, setAssignedUser] = useState(
  typeof task?.assignedTo === "string"
    ? task.assignedTo
    : task?.assignedTo?._id || ""
);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await api.get("/auth/users");

      setUsers(res.data.users);

    } catch (err) {
      console.error(err);
    }
  }

  async function saveChanges() {
    try {

     const res = await api.put(
  `/tasks/${task!._id}`,
  {
    dueDate,
    dueTime,
    assignedTo: assignedUser,
  }
);

dispatch(updateTask(res.data.task));

      alert("✅ Task Updated");

    } catch (err) {

      console.error(err);

      alert("❌ Failed to update task");

    }
  }
if (!task) return null;
  return (

    <div className="modal-overlay">

      <div className="task-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="modal-grid">

          <div className="modal-left">

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <div className="badge-row">

              <span className="priority-badge">
                {task.priority}
              </span>

              <span className="status-badge">
                {task.status}
              </span>

            </div>

            <div className="task-info">

              <div className="task-info-item">

                <label>📅 Due Date</label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) =>
                    setDueDate(e.target.value)
                  }
                />

              </div>

              <div className="task-info-item">

                <label>🕒 Due Time</label>

                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) =>
                    setDueTime(e.target.value)
                  }
                />

              </div>

              <div className="task-info-item">

                <label>👤 Assigned To</label>

                <select
                  value={assignedUser}
                  onChange={(e) =>
                    setAssignedUser(e.target.value)
                  }
                >

                  <option value="">
                    Select User
                  </option>

                  {users.map((user) => (

                    <option
                      key={user._id}
                      value={user._id}
                    >
                      {user.name}
                    </option>

                  ))}

                </select>

              </div>

            </div>

            <button
              className="save-date-btn"
              onClick={saveChanges}
            >
              💾 Save Changes
            </button>

          </div>

          <div className="modal-right">

            <CommentPanel
              task={task}
              onRefresh={onRefresh}
            />

            <hr />

            <ActivityTimeline
              activities={task.activity}
            />

          </div>

        </div>

      </div>

    </div>

  );
}