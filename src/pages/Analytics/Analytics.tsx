import { useMemo } from "react";
import { CheckCircle2, Clock3, ListTodo, Target } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import "./Analytics.css";
export default function Analytics() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const completed = tasks.filter((task) => task.status === "Done").length;
  const pending = tasks.length - completed;
  const completionRate = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;
  const priorityData = useMemo(() => {
    return {
      High: tasks.filter((task) => task.priority === "High").length,
      Medium: tasks.filter((task) => task.priority === "Medium").length,
      Low: tasks.filter((task) => task.priority === "Low").length,
    };
  }, [tasks]);
 
  const maxPriority = Math.max(
    priorityData.High,
    priorityData.Medium,
    priorityData.Low,
    1
  );
  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>Analytics</h1>
          <p>Track your productivity and task progress</p>
        </div>
      </div>
      <div className="analytics-stats">
        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <ListTodo size={20} />
          </div>
          <div>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <Clock3 size={20} />
          </div>
          <div>
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="analytics-stat-icon">
            <Target size={20} />
          </div>
          <div>
            <span>Completion Rate</span>
            <strong>{completionRate}%</strong>
          </div>
        </div>
      </div>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h2>Task Status</h2>
          <div className="status-chart">
            <div className="status-bar">
              <div
                className="status-completed"
                style={{
                  width: `${completionRate}%`,
                }}
              />
            </div>
            <div className="chart-labels">
              <span>Completed: {completed}</span>
              <span>Pending: {pending}</span>
            </div>
          </div>
        </div>
        <div className="analytics-card">
          <h2>Tasks by Priority</h2>
          <div className="bar-chart">
            {Object.entries(priorityData).map(
              ([priority, count]) => (
                <div className="bar-row" key={priority}>
                  <span>{priority}</span>
                  <div className="bar-track">
                    <div
                      className={`bar-fill ${priority.toLowerCase()}`}
                      style={{
                        width: `${(count / maxPriority) * 100}%`,
                      }}
                    />
                  </div>
                  <strong>{count}</strong>
                </div>
              )
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}