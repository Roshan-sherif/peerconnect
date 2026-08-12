import API from "./axios";


export const signup = (userData) => API.post("/auth/signup", userData,
    {withCredentials:true}
);
export const loginUser = (userData) => API.post("/auth/login", userData,
    {withCredentials:true}
);

export const getCurrentUser = () => {
  return API.get(
    "http://localhost:5000/api/auth/me",
    {
      withCredentials: true,
    }
  );

};

export const logout = (userData) => API.post("/auth/logout", 
    {withCredentials:true}
);
