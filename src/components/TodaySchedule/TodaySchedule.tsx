import "./TodaySchedule.css";

type ScheduleItem = {
  id: number;
  time: string;
  title: string;
  completed: boolean;
};

const schedule: ScheduleItem[] = [
  {
    id: 1,
    time: "10:00 AM",
    title: "Team Meeting",
    completed: true,
  },
  {
    id: 2,
    time: "2:00 PM",
    title: "Design Dashboard UI",
    completed: false,
  },
  {
    id: 3,
    time: "5:30 PM",
    title: "Backend Review",
    completed: false,
  },
];

function TodaySchedule() {
  return (
    <div className="schedule-card">
      <h2>Today's Schedule</h2>

      {schedule.map((task) => (
        <div className="schedule-item" key={task.id}>
          <div className="schedule-time">
            {task.time}
          </div>

          <div className="schedule-details">
            <h4>{task.title}</h4>

            <span>
              {task.completed ? "Completed" : "Upcoming"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodaySchedule;