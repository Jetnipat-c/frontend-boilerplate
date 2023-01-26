import axios from "axios";

const httpClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
});

httpClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.response.status === 403) {
      // Handle forbidden access
      alert("You are not authorized to access this resource");
    } else if (error.response.status === 500) {
      // Handle internal server error
      alert("An internal server error occurred");
    }
    return Promise.reject(error);
  }
);

export default httpClient;
