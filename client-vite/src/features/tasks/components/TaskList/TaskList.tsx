import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { TaskCard } from "../TaskCard";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import { useDeleteTask } from "../../hooks/useDeleteTask";

export const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useTasks();
  const { mutate: deleteTask } = useDeleteTask();

  const [filters, setFilters] = React.useState({
    status: "",
    search: "",
  });

  const handleFilterChange = (field: "status" | "search", value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress size={60} thickness={5} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ borderRadius: 2, mt: 4 }}
        action={
          <Button color="inherit" size="small" onClick={() => refetch()}>
            Retry
          </Button>
        }
      >
        Failed to load tasks. Please try again.
      </Alert>
    );
  }

  const tasks = data || [];
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesSearch =
      !filters.search ||
      task.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: 2,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.25rem" },
          }}
        >
          My Tasks
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/tasks/new")}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            background: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
            boxShadow: "0 4px 14px 0 rgba(0, 180, 216, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #0096c7 0%, #005f8d 100%)",
              boxShadow: "0 6px 20px 0 rgba(0, 180, 216, 0.4)",
              transform: "translateY(-1px)",
            },
          }}
        >
          New Task
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: 3,
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2.5 },
            flexWrap: "wrap",
          }}
        >
          <FormControl size="small" sx={{ minWidth: { xs: 120, sm: 140 } }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) =>
                handleFilterChange("status", e.target.value as string)
              }
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderWidth: 2,
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            placeholder="Search by title..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            sx={{
              flex: 1,
              minWidth: { xs: 200, sm: 300 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderWidth: 1.5,
                },
              },
            }}
          />

          <Chip
            label={`${filteredTasks.length} task${
              filteredTasks.length !== 1 ? "s" : ""
            } found`}
            sx={{
              borderRadius: 2,
              border: "1px solid rgba(0, 180, 216, 0.3)",
              color: "#00b4d8",
              fontWeight: 600,
              height: 36,
            }}
          />
        </Box>
      </Paper>

      {filteredTasks.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <Typography variant="h6" mb={1}>
            No tasks found
          </Typography>
          <Typography variant="body2">
            Create your first task to get started!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={task._id}>
              <TaskCard
                task={task}
                onEdit={() => navigate(`/tasks/edit/${task._id}`)}
                onDelete={(id) => deleteTask(id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
