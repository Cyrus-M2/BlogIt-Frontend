import axios from "./axios";

export const getUserBlogs = () => axios.get("/user/blogs");
export const updateUser = (data: any) => axios.patch("/user", data);
export const updateUserPassword = (data: any) =>
  axios.patch("/user/password", data);
