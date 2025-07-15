import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlog, deleteBlog } from "../api/blog";
import {
  Container,
  Typography,
  Button,
  Box,
  Avatar,
  Paper,
  CircularProgress,
} from "@mui/material";
import MarkdownRenderer from "../components/MarkdownRenderer";

const BlogDetails: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(id!);
        setBlog(res.data);
      } catch (err) {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Delete this blog?")) {
      await deleteBlog(id!);
      navigate("/blogs");
    }
  };

  if (error) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (loading || !blog) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <Paper sx={{ p: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <CircularProgress />
          <Typography>Wait for something amazing...</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          by{" "}
          <Avatar
            sx={{
              display: "inline-block",
              width: 28,
              height: 28,
              bgcolor: "primary.main",
              mr: 1,
            }}
          >
            {blog.author?.firstName?.[0]}
            {blog.author?.lastName?.[0]}
          </Avatar>
          {blog.author?.firstName} {blog.author?.lastName}
        </Typography>
      </Box>
      <Paper elevation={2} sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
        {blog.featuredImg && (
          <img
            src={blog.featuredImg}
            alt={blog.title}
            width="100%"
            style={{ maxHeight: 350, objectFit: "cover" }}
          />
        )}
      </Paper>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
        {blog.synopsis}
      </Typography>
      <MarkdownRenderer content={blog.content} />
      {user && user.id === blog.authorId && (
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/blogs/${blog.id}/edit`}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default BlogDetails;