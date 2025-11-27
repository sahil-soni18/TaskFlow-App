import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import LoginPage from "./features/auth/components/Login";
import { queryClient } from "./services/queryClient";
import { Layout } from "./features/common/components/Layout";
import TaskListPage from "./features/tasks/components/TaskList";
import TaskFormPage from "./features/tasks/components/TaskForm/TastFormPage";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthProvider";
import RegisterPage from "./features/auth/components/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <TaskListPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/new"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <TaskFormPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/edit/:id"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <TaskFormPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route path="/" element={<Navigate to="/tasks" replace />} />
              <Route path="*" element={<Navigate to="/tasks" replace />} />
            </Routes>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
