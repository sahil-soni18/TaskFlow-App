import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  IconButton,
} from "@mui/material";
import { DarkMode, LightMode, Logout, Task } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useTheme } from "../../../hooks/useTheme";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Stack sx={{ minHeight: "100vh", width: "100vw" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 }, minHeight: 70 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Task sx={{ mr: 2, fontSize: 30 }} />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ letterSpacing: 0.5 }}
            >
              TaskFlow
            </Typography>
          </Box>

          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                }}
              >
                {mode === "light" ? <DarkMode /> : <LightMode />}
              </IconButton>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  display: { xs: "none", lg: "block" },
                }}
              >
                Welcome, {user.name}
              </Typography>

              <Button
                color="inherit"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>{children}</Container>
    </Stack>
  );
};
