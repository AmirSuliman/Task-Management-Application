import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      // Request made but no response
      throw new Error(
        "No response from server. Please check if the backend is running."
      );
    } else {
      // Error in request setup
      throw new Error("Error setting up request");
    }
  }
);

export default apiClient;
