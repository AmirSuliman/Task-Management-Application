import { useState, useEffect, useCallback } from "react";
import taskService from "@/services/taskService";
import { Task, TaskStatus } from "@/types/common";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statusFilter = filter === "all" ? null : filter;
      const data = await taskService.getTasks(statusFilter);
      setTasks(data as Task[]);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Load tasks on mount and when filter changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create task
  const createTask = async (taskData: {
    title: string;
    description?: string;
  }) => {
    try {
      setError(null);
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask as Task, ...prev]);
      return { success: true, data: newTask };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      return { success: false, error: message };
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      setError(null);
      // Optimistic update
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      const updatedTask = await taskService.updateTaskStatus(taskId, newStatus);

      // Update with server response
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? (updatedTask as Task) : task))
      );

      return { success: true, data: updatedTask };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      // Revert optimistic update
      fetchTasks();
      return { success: false, error: message };
    }
  };

  // Delete task
  const deleteTask = async (taskId: string) => {
    try {
      setError(null);
      // Optimistic update
      setTasks((prev) => prev.filter((task) => task.id !== taskId));

      await taskService.deleteTask(taskId);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      // Revert optimistic update
      fetchTasks();
      return { success: false, error: message };
    }
  };

  // Get task counts by status
  const getTaskCounts = () => {
    return {
      all: tasks.length,
      pending: tasks.filter((t) => t.status === "pending").length,
      "in-progress": tasks.filter((t) => t.status === "in-progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
    };
  };

  return {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTaskStatus,
    deleteTask,
    refreshTasks: fetchTasks,
    taskCounts: getTaskCounts(),
  };
};
