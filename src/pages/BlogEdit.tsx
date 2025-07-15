import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { getBlog, updateBlog } from "../api/blog";
import { useParams, useNavigate } from "react-router-dom";

const BlogEdit: React.FC = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    content: "",
    featuredImg: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBlog(id!).then((res) => {
      const { title, synopsis, content, featuredImg } = res.data;
      setForm({ title, synopsis, content, featuredImg });
    });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await updateBlog(id!, form);
      navigate(`/blogs/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update blog");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Blog
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
          <TextField
            margin="normal"
            label="Featured Image URL"
            name="featuredImg"
            value={form.featuredImg}
            onChange={handleChange}
            fullWidth
            required
          />
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
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default BlogEdit;
