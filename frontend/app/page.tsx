"use client";

import CreateTaskForm from "@/components/CreateTaskForm";
import FilterTabs from "@/components/FilterTabs";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskList from "@/components/TaskList";
import taskService from "@/services/taskService";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statusFilter = filter === "all" ? null : filter;
      const data = await taskService.getTasks(statusFilter);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  // Load tasks on mount and when filter changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
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
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );

      return { success: true, data: updatedTask };
    } catch (err) {
      setError(err.message);
      // Revert optimistic update
      fetchTasks();
      return { success: false, error: err.message };
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      setError(null);
      // Optimistic update
      setTasks((prev) => prev.filter((task) => task.id !== taskId));

      await taskService.deleteTask(taskId);
      return { success: true };
    } catch (err) {
      setError(err.message);
      // Revert optimistic update
      fetchTasks();
      return { success: false, error: err.message };
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
  const taskCounts = getTaskCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Task Management
            </h1>
            <p className="text-gray-600">
              Organize your work and life, finally.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {/* Create Task Form */}
          <CreateTaskForm />

          <FilterTabs
            activeFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />

          {/* Task List */}
          <div className="p-4">
            {loading ? (
              <LoadingSpinner text="Loading tasks..." />
            ) : (
              <TaskList
                tasks={tasks}
                onUpdateStatus={updateTaskStatus}
                onDelete={deleteTask}
              />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-8">
          <p>Built with Next.js, Express, and MongoDB</p>
        </footer>
      </div>
    </div>
  );
}
