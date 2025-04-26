import axios from "axios";


export const baseUrlExport = import.meta.env.VITE_REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseUrlExport,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // "IDENTIFIER": "A2hG9tE4rB6kY1sN"
    // You can add more default headers here if needed
  },
});
/*
// Add an interceptor to set the Authorization header before each request
instance.interceptors.request.use(
  (config) => {
    const currentUser = localStorage.getItem("currentUserToken");
    const token = currentUser;
    // token = localStorage.getItem(currentUser as string)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
*/
export default instance;

