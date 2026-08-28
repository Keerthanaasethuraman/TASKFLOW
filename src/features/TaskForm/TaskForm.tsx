import "./TaskForm.css";
import { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useAppSelector } from "../../redux/hooks";
import { Clock } from "lucide-react";
type Task = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  date: string;
  time: string;
  project?: string;
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
  const [project, setProject] = useState("");

  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const projects = useAppSelector(
    (state) => state.project.projects
  );

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setProject(initialTask.project || "");
      setPriority(initialTask.priority);
      setDate(initialTask.date);
      setTime(initialTask.time);
    } else {
      setTitle("");
      setDescription("");
      setProject("");
      setPriority("Medium");
      setDate("");
      setTime("");
    }
  }, [initialTask]);

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    console.log("HANDLE SUBMIT WORKING");

    if (!title.trim()) return;

    onSaveTask({
      title,
      description,
      priority,
      date,
      time,
      project,
    });

    if (!initialTask) {
      setTitle("");
      setDescription("");
      setProject("");
      setPriority("Medium");
      setDate("");
      setTime("");
    }
  }

  return (
    <form
  onSubmit={(e) => {
    console.log("FORM SUBMITTED");
    handleSubmit(e);
  }}
>

      <Input
        label="Task Title"
        placeholder="Enter task title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <Input
        label="Description"
        placeholder="Enter description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      {/* ================= PROJECT ================= */}

      <div className="form-group">
        <label>Project</label>

        <select
          value={project}
          onChange={(e) =>
            setProject(e.target.value)
          }
        >
          <option value="">
            Select Project
          </option>

          {projects.map((projectItem) => (
            <option
              key={projectItem._id}
              value={projectItem._id}
            >
              {projectItem.name}
            </option>
          ))}
        </select>
      </div>

      {/* ================= PRIORITY ================= */}

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
          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>
      </div>

      {/* ================= DATE ================= */}

      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
      />

      {/* ================= TIME ================= */}

      <Input
  label="Time"
  type="time"
  icon={<Clock size={16} />}
  value={time}
  onChange={(e) =>
    setTime(e.target.value)
  }
/>
      {/* ================= BUTTONS ================= */}

      <div className="task-form-buttons">

        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

       <Button
  type="submit"
  onClick={() => console.log("SAVE BUTTON CLICKED")}
>
  {initialTask ? "Save Changes" : "Create Task"}
</Button>

      </div>

    </form>
  );
}

export default TaskForm;