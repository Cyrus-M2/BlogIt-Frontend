import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar
      position={isLanding ? "fixed" : "static"}
      sx={{
        backgroundColor: isLanding ? "#1976d2" : undefined,
        backdropFilter: isLanding ? "blur(10px)" : undefined,
        boxShadow: isLanding ? "none" : undefined,
        py: isLanding ? 1 : undefined,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          <Box
            component="span"
            sx={{ color: isLanding ? "#ffffff" : undefined, fontWeight: 700 }}
          >
            Blog
          </Box>
          It
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!token
                ? [
                    <MenuItem
                      key="login"
                      component={Link}
                      to="/login"
                      onClick={handleMenuClose}
                    >
                      Login
                    </MenuItem>,
                    <MenuItem
                      key="register"
                      component={Link}
                      to="/register"
                      onClick={handleMenuClose}
                    >
                      Sign Up
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="blogs"
                      component={Link}
                      to="/blogs"
                      onClick={handleMenuClose}
                    >
                      Posts
                    </MenuItem>,
                    <MenuItem
                      key="new-blog"
                      component={Link}
                      to="/blogs/new"
                      onClick={handleMenuClose}
                    >
                      New Blog
                    </MenuItem>,
                    <MenuItem
                      key="profile"
                      component={Link}
                      to="/profile"
                      onClick={handleMenuClose}
                    >
                      Profile
                    </MenuItem>,
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        handleMenuClose();
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>,
                  ]}
            </Menu>
          </>
        ) : (
          <Stack direction="row" spacing={2}>
            {!token ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: isLanding
                        ? "rgba(255, 255, 255, 0.1)"
                        : undefined,
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant={isLanding ? "contained" : "outlined"}
                  color={isLanding ? "secondary" : "inherit"}
                  component={Link}
                  to="/register"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    ...(isLanding
                      ? {
                          backgroundColor: "white",
                          color: "#1976d2",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                        }
                      : {}),
                  }}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/blogs">
                  Posts
                </Button>
                <Button color="inherit" component={Link} to="/blogs/new">
                  New Blog
                </Button>
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
                <Box sx={{ mx: 2, display: "flex", alignItems: "center" }}>
                  {user?.firstName
                    ? `Welcome back ${user.firstName.toLowerCase()}`
                    : ""}
                </Box>
                <Button
                  color={isLanding ? "inherit" : "secondary"}
                  onClick={handleLogout}
                  sx={{
                    ...(isLanding
                      ? {
                          border: "1px solid white",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }
                      : {}),
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
