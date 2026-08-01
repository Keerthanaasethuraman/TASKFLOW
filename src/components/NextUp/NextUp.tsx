import "./NextUp.css";

import { Clock3, Flag } from "lucide-react";
import Button from "../Button/Button";

type NextUpProps = {
  title: string;
  description: string;
  time: string;
  priority: string;
};

function NextUp({
  title,
  description,
  time,
  priority,
}: NextUpProps) {
  return (
    <div className="next-up-card">
      <div className="next-up-header">
        <h2>Next Up</h2>
      </div>

      <h3>{title}</h3>

      <p className="task-description">
        {description}
      </p>

      <div className="task-meta">
        <div className="meta-item">
          <Clock3 size={16} />
          <span>{time}</span>
        </div>

        <div className="meta-item">
          <Flag size={16} />
          <span>{priority}</span>
        </div>
      </div>

      <Button variant="primary">
        Start Task
      </Button>
    </div>
  );
}

export default NextUp;