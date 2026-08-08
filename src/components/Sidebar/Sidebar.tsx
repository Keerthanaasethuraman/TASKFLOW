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
    <aside className="sidebar">

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

          <div
            className={`sidebar-item ${
              location.pathname === "/dashboard"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </div>

          <div
            className={`sidebar-item ${
              location.pathname === "/kanban"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/kanban")}
          >
            <CheckSquare size={20} />
            Kanban
          </div>

          <div
            className="sidebar-item"
          >
            <CalendarDays size={20} />
            Calendar
          </div>

          <div
            className="sidebar-item"
          >
            <FolderKanban size={20} />
            Projects
          </div>

          <div
            className="sidebar-item"
          >
            <ChartNoAxesCombined size={20} />
            Analytics
          </div>

          <div
            className={`sidebar-item ${
              location.pathname === "/settings"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/settings")}
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