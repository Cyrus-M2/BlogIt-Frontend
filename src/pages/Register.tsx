import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          required
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Register;
