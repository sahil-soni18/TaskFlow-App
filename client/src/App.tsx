import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, Typography, Box } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";

// Create a client
const queryClient = new QueryClient();

// Temporary placeholder components - we'll replace these with actual pages
const LoginPage = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4">Login Page</Typography>
    <Typography variant="body1">We'll build this soon...</Typography>
  </Box>
);

const TaskListPage = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4">Task List Page</Typography>
    <Typography variant="body1">We'll build this soon...</Typography>
  </Box>
);

const TaskFormPage = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4">Task Form Page</Typography>
    <Typography variant="body1">We'll build this soon...</Typography>
  </Box>
);

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                align="center"
              >
                TaskFlow App
              </Typography>

              <Routes>
                {/* Public Route */}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes - will add authentication later */}
                <Route path="/tasks" element={<TaskListPage />} />
                <Route path="/tasks/new" element={<TaskFormPage />} />
                <Route path="/tasks/edit/:id" element={<TaskFormPage />} />

                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/tasks" replace />} />

                {/* 404 fallback */}
                <Route path="*" element={<Navigate to="/tasks" replace />} />
              </Routes>
            </Box>
          </Container>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
