import axios from "./axios";

export const getUser = (userData) => API.post("/user/profile", userData,
    {withCredentials:true}
);
