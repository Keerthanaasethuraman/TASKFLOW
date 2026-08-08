import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

import Layout from "./components/Layout/Layout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Settings from "./pages/Settings/Settings";

// ✅ Import Kanban Board
import KanbanBoard from "./components/kanban/KanbanBoard";

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
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

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
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;