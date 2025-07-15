import axios from "./axios";

export const getMyBlogs = () => axios.get("/blogs/my");
export const getBlogs = () => axios.get("/blogs");
export const getBlog = (id: string) => axios.get(`/blogs/${id}`);
export const createBlog = (data: any) => axios.post("/blogs", data);
export const updateBlog = (id: string, data: any) =>
  axios.patch(`/blogs/${id}`, data);
export const deleteBlog = (id: string) => axios.delete(`/blogs/${id}`);
