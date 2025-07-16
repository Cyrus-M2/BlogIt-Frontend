import axios from "./axios";

export const register = (data: any) => axios.post("/auth/register", data);
export const login = (data: { emailOrUsername: string; password: string }) =>
  axios.post("/auth/login", data);
export const logout = () => axios.post("/auth/logout");
