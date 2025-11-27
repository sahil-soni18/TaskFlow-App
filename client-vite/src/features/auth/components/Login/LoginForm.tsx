import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Typography, Alert, Paper, Link } from "@mui/material";
import { Login as LoginIcon } from "@mui/icons-material";
import { useLogin } from "../../hooks/useLogin";
import { loginSchema } from "../../../../utils/validations";
import { LoadingButton } from "@mui/lab";
import type { LoginFormData } from "../../types";

import { Link as RouterLink } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Sign in to your TaskFlow account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message || "Login failed. Please check your credentials."}
          </Alert>
        )}

        <TextField
          {...register("email")}
          label="Email Address"
          type="email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          autoComplete="email"
          autoFocus
        />

        <TextField
          {...register("password")}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete="current-password"
        />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isPending}
          loadingPosition="start"
          startIcon={<LoginIcon />}
          sx={{ mt: 3, mb: 2 }}
          size="large"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </LoadingButton>

        <Typography variant="body2" color="text.secondary" align="center">
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="always"
            sx={{ cursor: "pointer" }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};
