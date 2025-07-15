import axios from "./axios";

export const register = (data: any) => axios.post("api/auth/register", data);
export const login = (data: { emailOrUsername: string; password: string }) =>
  axios.post("api/auth/login", data);
export const logout = () => axios.post("api/auth/logout");
