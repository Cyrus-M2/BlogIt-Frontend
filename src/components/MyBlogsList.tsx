import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { getMyBlogs } from "../api/blog";
import BlogCard from "../components/BlogCard";

const MyBlogsList: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBlogs().then((res) => {
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
        My Blogs
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
          You haven't written any blogs yet.
        </Typography>
      )}
    </Container>
  );
};

export default MyBlogsList;