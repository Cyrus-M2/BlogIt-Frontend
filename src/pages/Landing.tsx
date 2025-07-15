import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

const Landing: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 7, sm: 10 },
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              borderRadius: 4,
              p: { xs: 3, sm: 6 },
              boxShadow: 24,
              mx: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(45deg, #00bcd4, #4caf50)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.2rem", sm: "3rem" },
              }}
            >
              Welcome to BlogIt!
            </Typography>

            <Typography
              variant={isMobile ? "body1" : "h5"}
              component="h2"
              gutterBottom
              sx={{
                mb: 4,
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.6,
                fontSize: { xs: "1rem", sm: "1.5rem" },
              }}
            >
              Your personal blogging platform where ideas come to life. Write,
              share, and connect with a community of passionate readers.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
                size={isMobile ? "medium" : "large"}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                Get Started
              </Button>

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="inherit"
                size={isMobile ? "medium" : "large"}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Login
              </Button>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                mt: 4,
                color: "rgba(255, 255, 255, 0.7)",
                fontStyle: "italic",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              Join thousands of writers sharing their stories
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
