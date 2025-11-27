import React, { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Save, ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import { useTask } from "../hooks/useTask";
import { useCreateTask } from "../hooks/useCreateTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

import { taskSchema } from "../../../utils/validations";
import type { TaskFormData } from "../types";

interface TaskFormProps {
  mode: "create" | "edit";
}

export const TaskForm: React.FC<TaskFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: existingTask, isLoading } = useTask(id || "");
  const { mutate: createTask, isPending: creating } = useCreateTask();
  const { mutate: updateTask, isPending: updating } = useUpdateTask();

  const isEdit = mode === "edit";
  const isSubmitting = creating || updating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema) as unknown as Resolver<TaskFormData>,
    defaultValues: {
      title: "",
      description: "",
      priority: 3,
      dueDate: "",
      tags: [],
      assignedTo: "",
    },
  });

  // Load data when editing
  useEffect(() => {
    if (isEdit && existingTask) {
      const t = existingTask.task;

      reset({
        title: t.title,
        description: t.description,
        priority: t.priority,
        dueDate: t.dueDate?.substring?.(0, 10) || "",
        tags: t.tags,
        assignedTo: t.metadata?.assignedTo || "",
      });
    }
  }, [isEdit, existingTask, reset]);

  const onSubmit = (data: TaskFormData) => {
    const cleanData = {
      ...data,
      tags:
        typeof data.tags === "string"
          ? data.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : Array.isArray(data.tags)
          ? data.tags
          : [],
    };

    if (isEdit && id) {
      updateTask({ taskId: id, updatedData: cleanData });
    } else {
      createTask(cleanData, { onSuccess: () => navigate("/tasks") });
    }
  };

  if (isEdit && isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/tasks")}
          variant="outlined"
        >
          Back
        </Button>
        <Typography variant="h4">
          {isEdit ? "Edit Task" : "Create Task"}
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField
          {...register("title")}
          label="Title"
          fullWidth
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          {...register("description")}
          label="Description"
          multiline
          rows={4}
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          {...register("priority")}
          label="Priority"
          select
          fullWidth
          error={!!errors.priority}
          helperText={errors.priority?.message}
        >
          {[1, 2, 3, 4, 5].map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          {...register("dueDate")}
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.dueDate}
          helperText={errors.dueDate?.message}
        />

        {/* Simple CSV tags input */}
        <TextField
          label="Tags (comma separated)"
          {...register("tags")}
          placeholder="work, urgent"
          fullWidth
        />

        <TextField
          {...register("assignedTo")}
          label="Assigned To (optional)"
          fullWidth
          error={!!errors.assignedTo}
          helperText={errors.assignedTo?.message}
        />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={() => navigate("/tasks")}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingPosition="start"
            startIcon={<Save />}
          >
            {isEdit ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Paper>
  );
};
