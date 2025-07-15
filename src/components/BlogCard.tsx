import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blog: any;
}

const getInitials = (first: string, last: string) =>
  `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => (
  <Card
    sx={{
      borderRadius: 2,
      boxShadow: 3,
      height: 370,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <CardMedia
      component="img"
      height="180"
      image={blog.featuredImg}
      alt={blog.title}
      sx={{ borderRadius: "12px 12px 0 0" }}
    />
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {blog.title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          minHeight: 36,
          maxHeight: 48,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {blog.synopsis}
      </Typography>
      <Box sx={{ mt: "auto", display: "flex", alignItems: "center" }}>
        <Avatar sx={{ width: 30, height: 30, bgcolor: "primary.main" }}>
          {blog.author
            ? getInitials(blog.author.firstName, blog.author.lastName)
            : "?"}
        </Avatar>
        <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
          {getInitials(
            blog.author?.firstName ?? "",
            blog.author?.lastName ?? "",
          )}
        </Typography>
      </Box>
    </CardContent>
    <CardActions sx={{ mt: "auto" }}>
      <Button size="small" component={Link} to={`/blogs/${blog.id}`}>
        Read More
      </Button>
    </CardActions>
  </Card>
);

export default BlogCard;