import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import api from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTasks } from "../../redux/taskSlice";
import "./Calendar.css";
export default function Calendar() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    fetchTasks();
  }, []);
  async function fetchTasks() {
    try {
      const res = await api.get("/tasks");
      dispatch(setTasks(res.data.tasks));
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }
  function formatDate(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [currentDate]);
  const selectedTasks = useMemo(() => {
    const selected = formatDate(selectedDate);
    return tasks
      .filter((task) => {
        if (!task.dueDate) return false;
        return task.dueDate.split("T")[0] === selected;
      })
      .sort((a, b) =>
        (a.dueTime || "").localeCompare(b.dueTime || "")
      );
  }, [tasks, selectedDate]);
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  function previousMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
      )
    );
  }
  function nextMonth() {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      )
    );
  }
  function goToToday() {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }
  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div>
          <h1>Calendar</h1>
          <p>View your tasks by date</p>
        </div>
        <button
          className="calendar-add-btn"
          onClick={() => console.log("Add task from calendar")}
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>
      <div className="calendar-card">
        <div className="calendar-toolbar">
          <button className="calendar-nav" onClick={previousMonth}>
            <ChevronLeft size={20} />
          </button>
          <h2>{monthName}</h2>
          <button className="calendar-nav" onClick={nextMonth}>
            <ChevronRight size={20} />
          </button>
          <button className="today-btn" onClick={goToToday}>
            Today
          </button>
        </div>
        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div key={day}>{day}</div>
            )
          )}
        </div>
        <div className="calendar-grid">
          {calendarDays.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className="calendar-day empty"
                />
              );
            }
            const dayTasks = tasks.filter((task) => {
              if (!task.dueDate) return false;
              return task.dueDate.split("T")[0] === formatDate(date);
            });
            const isToday = isSameDay(date, new Date());
            const isSelected = isSameDay(date, selectedDate);
            return (
              <button
                key={date.toISOString()}
                className={`calendar-day ${isToday ? "today" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <span className="day-number">{date.getDate()}</span>
                {dayTasks.length > 0 && (
                  <span className="task-count">
                    {dayTasks.length}{" "}
                    {dayTasks.length === 1 ? "task" : "tasks"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="selected-day-section">
        <div className="selected-day-header">
          <div>
            <h2>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <p>
              {selectedTasks.length}{" "}
              {selectedTasks.length === 1 ? "task" : "tasks"} scheduled
            </p>
          </div>
        </div>

        {selectedTasks.length === 0 ? (
          <div className="calendar-empty">
            <h3>No tasks scheduled</h3>
            <p>Select another date or create a new task.</p>
          </div>
        ) : (
          <div className="calendar-task-list">
            {selectedTasks.map((task) => (
              <div className="calendar-task" key={task._id}>
                <div className="calendar-task-time">
                  {task.dueTime || "--:--"}
                </div>

                <div className="calendar-task-info">
                  <h3>{task.title}</h3>
                  <p>{task.description || "No description"}</p>
                </div>

                <span
                  className={`calendar-priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

                <span
                  className={`calendar-status ${
                    task.status === "Done" ? "done" : ""
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}