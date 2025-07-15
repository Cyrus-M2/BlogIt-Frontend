import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { getBlogs } from "../api/blog";
import BlogCard from "../components/BlogCard";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((res) => {
      setBlogs(res.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3, fontWeight: 700 }}>
        All Blogs
      </Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} md={6} lg={4} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
      {blogs.length === 0 && (
        <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
          No blogs yet.
        </Typography>
      )}
    </Container>
  );
};

export default BlogList;
