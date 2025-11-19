import apiClient from "../utils/apiClient";

const taskService = {
  // Get all tasks with optional status filter
  async getTasks(status: string | null = null) {
    try {
      const url = status ? `/tasks?status=${status}` : "/tasks";
      const response = await apiClient.get(url);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new task
  async createTask(taskData: { title: string; description?: string }) {
    try {
      const response = await apiClient.post("/tasks", taskData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Update task status
  async updateTaskStatus(taskId: string, status: string) {
    try {
      const response = await apiClient.patch(`/tasks/${taskId}`, { status });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a task
  async deleteTask(taskId: string) {
    try {
      const response = await apiClient.delete(`/tasks/${taskId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default taskService;
