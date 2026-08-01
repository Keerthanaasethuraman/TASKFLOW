import "./Sidebar.css";

import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  FolderKanban,
  ChartNoAxesCombined,
  Settings,
  User,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div>

        <div className="sidebar-logo">
          <h1>TaskFlow</h1>
          <p>Focus • Plan • Achieve</p>
        </div>

        <div className="calendar-card">

          <div className="calendar-paper">

            <h2>November</h2>

            <span>2026</span>

            <div className="calendar-days">

              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>

              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={i === 10 ? "active-day" : ""}
                >
                  {i + 1}
                </div>
              ))}

            </div>

          </div>

        </div>

        <nav>

          <div className="sidebar-item active">
            <LayoutDashboard size={20} />
            Dashboard
          </div>

          <div className="sidebar-item">
            <CheckSquare size={20} />
            Tasks
          </div>

          <div className="sidebar-item">
            <CalendarDays size={20} />
            Calendar
          </div>

          <div className="sidebar-item">
            <FolderKanban size={20} />
            Projects
          </div>

          <div className="sidebar-item">
            <ChartNoAxesCombined size={20} />
            Analytics
          </div>

          <div className="sidebar-item">
            <Settings size={20} />
            Settings
          </div>

        </nav>

      </div>

      <div className="sidebar-user">

        <div className="avatar">
          <User size={22} />
        </div>

        <div>

          <h4>Keerthana</h4>

          <p>Focus • Plan • Achieve</p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;