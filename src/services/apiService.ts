import axios from "axios";

export const apiService = axios.create({
  baseURL: "http://localhost:9000/api",
  timeout: 1000 * 60, // 1 minute
});

// interceptor response
apiService.interceptors.response.use((response) => {
  return response.data;
});
