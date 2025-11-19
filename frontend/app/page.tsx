"use client";

import CreateTaskForm from "@/components/CreateTaskForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskList from "@/components/TaskList";
import taskService from "@/services/taskService";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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

          {/* Task List */}
          <div className="p-4">
            {loading ? (
              <LoadingSpinner text="Loading tasks..." />
            ) : (
              <TaskList tasks={tasks} />
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
