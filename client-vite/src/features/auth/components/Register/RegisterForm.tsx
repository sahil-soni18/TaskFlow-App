import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  TextField,
  Typography,
  Alert,
  Paper,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PersonAdd } from "@mui/icons-material";
import { useRegister } from "../../hooks/useRegister";
import { registerSchema } from "../../../../utils/validations";
import type { RegisterFormData } from "../../types";

export const RegisterForm: React.FC = () => {
  const { mutate: registerUser, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message || "Registration failed"}
          </Alert>
        )}

        <TextField
          {...register("name")}
          label="Full Name"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          {...register("email")}
          label="Email Address"
          type="email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("password")}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          {...register("role")}
          select
          label="Role"
          fullWidth
          margin="normal"
          error={!!errors.role}
          helperText={errors.role?.message}
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isPending}
          loadingPosition="start"
          startIcon={<PersonAdd />}
          sx={{ mt: 3 }}
          size="large"
        >
          {isPending ? "Creating Account..." : "Register"}
        </LoadingButton>
      </Box>
    </Paper>
  );
};
