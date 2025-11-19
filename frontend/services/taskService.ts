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

const taskService = {
  // Get all tasks with optional status filter
  async getTasks(status = null) {
    try {
      const url = status ? `/tasks?status=${status}` : "/tasks";
      const response = await apiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new task
  async createTask(taskData) {
    try {
      const response = await apiClient.post("/tasks", taskData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task status
  async updateTaskStatus(taskId, status) {
    try {
      const response = await apiClient.patch(`/tasks/${taskId}`, { status });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a task
  async deleteTask(taskId) {
    try {
      const response = await apiClient.delete(`/tasks/${taskId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default taskService;
