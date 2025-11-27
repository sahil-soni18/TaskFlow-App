import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, CssBaseline } from "@mui/material";
import { useAuth } from "../../../../hooks/useAuth";
import { RegisterForm } from "./RegisterForm";

const RegisterPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/tasks", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100dvh",
          width: "100dvw",
          backgroundColor: "#000814",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 3,
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          color="white"
          mb={1}
          sx={{ fontSize: { xs: "2.5rem", sm: "3.5rem" } }}
        >
          Task Manager
        </Typography>
        <Typography variant="h6" color="rgba(255, 255, 255, 0.7)" mb={6}>
          Sign up to continue
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: 420,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RegisterForm />
        </Box>
      </Box>
    </>
  );
};

export default RegisterPage;
