import "./TaskForm.css";

import { useEffect, useState } from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

type Task = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  date: string;
  time: string;
};

type TaskFormProps = {
  onSaveTask: (task: Task) => void;
  onCancel: () => void;
  initialTask?: Task | null;
};

function TaskForm({
  onSaveTask,
  onCancel,
  initialTask,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setDate(initialTask.date);
      setTime(initialTask.time);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDate("");
      setTime("");
    }
  }, [initialTask]);

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) return;

    onSaveTask({
      title,
      description,
      priority,
      date,
      time,
    });    if (!initialTask) {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDate("");
      setTime("");
    }
  }

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <Input
        label="Task Title"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        label="Description"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="form-group">
        <label>Priority</label>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value as
                | "High"
                | "Medium"
                | "Low"
            )
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Input
        label="Time"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <div className="task-form-buttons">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {initialTask ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;