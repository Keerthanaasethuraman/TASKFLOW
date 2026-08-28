import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";
import TodaysSchedule from "./pages/TodaysSchedule/TodaysSchedule";
import KanbanBoard from "./components/kanban/KanbanBoard";
import Calendar from "./pages/Calendar/Calendar";
import Projects from "./pages/Projects/Projects";
import Analytics from "./pages/Analytics/Analytics";
function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />
        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Kanban */}
        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <Layout>
                <KanbanBoard />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Today's Schedule */}
        <Route
          path="/todays-schedule"
          element={
            <ProtectedRoute>
              <Layout>
                <TodaysSchedule />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Default */}
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
<Route
  path="/calendar"
  element={
    <ProtectedRoute>
      <Layout>
        <Calendar />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/projects"
  element={
    <ProtectedRoute>
      <Layout>
        <Projects />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Layout>
        <Analytics />
      </Layout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;