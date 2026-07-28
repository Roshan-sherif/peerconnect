import API from "./axios";


export const signup = (userData) => API.post("/auth/signup", userData);