import React, { useState, useRef } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { createBlog } from "../api/blog";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const BlogCreate: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    content: "",
    featuredImg: "",
    publicId: "",
  });
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createBlog(form);
      navigate("/blogs");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create blog");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm((prevForm) => ({
        ...prevForm,
        featuredImg: res.data.imageUrl,
        publicId: res.data.publicId,
      }));
    } catch (err) {
      console.error("Upload failed", err);
      setError("Image upload failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="normal"
            label="Synopsis"
            name="synopsis"
            value={form.synopsis}
            onChange={handleChange}
            fullWidth
            required
          />

          <Button
            variant="outlined"
            onClick={() => fileInput.current?.click()}
            sx={{ my: 1 }}
          >
            Upload Featured Image
          </Button>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInput}
            onChange={handleImageUpload}
          />
          {form.featuredImg && (
            <img
              src={form.featuredImg}
              alt="preview"
              style={{ maxWidth: 200, marginTop: 8, borderRadius: 6 }}
            />
          )}

          <TextField
            margin="normal"
            label="Content (Markdown supported)"
            name="content"
            value={form.content}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={8}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default BlogCreate;
