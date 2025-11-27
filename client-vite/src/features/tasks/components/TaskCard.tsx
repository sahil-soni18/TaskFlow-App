import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Edit, Delete, Schedule, Person } from "@mui/icons-material";
import type { ITask } from "../types";

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(task);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(task._id);
    handleMenuClose();
  };

  const getStatusColor = (
    status: string
  ): "success" | "warning" | "default" => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 5:
        return "error";
      case 4:
        return "warning";
      case 3:
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        transition: "all 0.2s",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography variant="h6" component="h3" sx={{ flex: 1, mr: 1 }}>
            {task.title}
          </Typography>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        {task.tags.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {task.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ mr: 0.5, mb: 0.5 }}
              />
            ))}
            {task.tags.length > 3 && (
              <Chip
                label={`+${task.tags.length - 3}`}
                size="small"
                variant="outlined"
                sx={{ mb: 0.5 }}
              />
            )}
          </Box>
        )}

        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip
              label={task.status}
              size="small"
              color={getStatusColor(task.status)}
              variant="outlined"
            />
            <Chip
              label={`Priority: ${task.priority}`}
              size="small"
              color={getPriorityColor(task.priority)}
            />
          </Box>

          <Box display="flex" gap={2} flexWrap="wrap">
            <Box display="flex" alignItems="center" gap={0.5}>
              <Schedule fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={0.5}>
              <Person fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                {task.metadata.assignedTo === task.metadata.createdBy
                  ? "Self"
                  : "Assigned"}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <Edit fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <Delete fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};
