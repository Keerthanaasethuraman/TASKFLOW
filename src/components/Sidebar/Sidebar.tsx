import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  FolderKanban,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside>

      {/* Logo */}
      <div>

        <div className="sidebar-logo">
          <h1>TaskFlow</h1>
          <p>Your Productivity Hub</p>
        </div>

        <div className="sidebar-section-title">
          Main Menu
        </div>

        <nav>

          {/* Dashboard */}
          <div
            className={`sidebar-item ${
              location.pathname === "/dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </div>

          {/* Kanban */}
          <div
            className={`sidebar-item ${
              location.pathname === "/kanban"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/kanban")
            }
          >
            <CheckSquare size={20} />
            Kanban
          </div>

          {/* Today's Schedule */}
          <div
            className={`sidebar-item ${
              location.pathname ===
              "/todays-schedule"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/todays-schedule")
            }
          >
            <CalendarDays size={20} />
            Today's Schedule
          </div>

          {/* Calendar */}
         <div
  className={`sidebar-item ${
    location.pathname === "/calendar" ? "active" : ""
  }`}
  onClick={() => navigate("/calendar")}
>
  <CalendarDays size={20} />
  Calendar
</div>

          {/* Projects */}
         <div
  className={`sidebar-item ${
    location.pathname === "/projects" ? "active" : ""
  }`}
  onClick={() => navigate("/projects")}
>
  <FolderKanban size={20} />
  Projects
</div>

          {/* Analytics */}
          <div
  className={`sidebar-item ${
    location.pathname === "/analytics" ? "active" : ""
  }`}
  onClick={() => navigate("/analytics")}
>
  <ChartNoAxesCombined size={20} />
  Analytics
</div>

          {/* Settings */}
          <div
            className={`sidebar-item ${
              location.pathname === "/settings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/settings")
            }
          >
            <Settings size={20} />
            Settings
          </div>

        </nav>

      </div>

    </aside>
  );
}

export default Sidebar;