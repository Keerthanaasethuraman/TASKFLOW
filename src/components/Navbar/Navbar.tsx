import "./Navbar.css";
import { Bell, Plus, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-subtitle">Welcome back 👋</span>
        <h1>Akshay</h1>
        <p>Stay focused. Small progress every day adds up to big results.</p>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
          />
        </div>

        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button className="add-task-btn">
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}