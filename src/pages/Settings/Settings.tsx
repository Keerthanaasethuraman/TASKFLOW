import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/authSlice";

export default function Settings() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  return (
    <div className="settings-page">

      <h1>⚙️ Settings</h1>

      <div className="settings-card">

        <h2>Profile</h2>

        <div className="profile-info">
          <p>
            <strong>Name:</strong>{" "}
            {user?.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>
        </div>

      </div>

      <div className="settings-card">

        <h2>Security</h2>

        <button
          className="logout-btn"
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}