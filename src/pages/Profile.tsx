import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import { getUserBlogs, updateUser, updateUserPassword } from "../api/user";
import BlogCard from "../components/BlogCard";

const Profile: React.FC = () => {
  const userStr = localStorage.getItem("user");
  const userBase = userStr ? JSON.parse(userStr) : null;

  const [user, setUser] = useState({ ...userBase });
  const [form, setForm] = useState({ ...userBase });
  const [blogs, setBlogs] = useState<any[]>([]);
  const [infoMsg, setInfoMsg] = useState("");
  const [infoErr, setInfoErr] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    getUserBlogs().then((res) => setBlogs(res.data));
  }, []);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMsg("");
    setInfoErr("");
    try {
      const res = await updateUser(form);
      setInfoMsg("Profile updated");
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err: any) {
      setInfoErr(err.response?.data?.error || "Failed to update");
    }
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwForm({ ...pwForm, [e.target.name]: e.target.value });
  };

  const handlePwSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg("");
    setPwErr("");
    try {
      await updateUserPassword(pwForm);
      setPwMsg("Password updated!");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err: any) {
      setPwErr(err.response?.data?.error || "Failed to update password");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={handleInfoSubmit} sx={{ mb: 3 }}>
          <Typography variant="h6">Personal Info</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleInfoChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleInfoChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleInfoChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInfoChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          {infoMsg && <Box sx={{ color: "green", mt: 1 }}>{infoMsg}</Box>}
          {infoErr && <Box sx={{ color: "red", mt: 1 }}>{infoErr}</Box>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Info
          </Button>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box component="form" onSubmit={handlePwSubmit}>
          <Typography variant="h6">Change Password</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Password"
                name="currentPassword"
                type="password"
                value={pwForm.currentPassword}
                onChange={handlePwChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="New Password"
                name="newPassword"
                type="password"
                value={pwForm.newPassword}
                onChange={handlePwChange}
                required
                fullWidth
              />
            </Grid>
          </Grid>
          {pwMsg && <Box sx={{ color: "green", mt: 1 }}>{pwMsg}</Box>}
          {pwErr && <Box sx={{ color: "red", mt: 1 }}>{pwErr}</Box>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Your Blogs
      </Typography>
      <Grid container spacing={2}>
        {blogs.length === 0 && (
          <Typography color="text.secondary" sx={{ ml: 2 }}>
            No blogs yet.
          </Typography>
        )}
        {blogs.map((blog) => (
          <Grid item xs={12} md={6} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;
