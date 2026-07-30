import API from "./axios";


export const signup = (userData) => API.post("/auth/signup", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);