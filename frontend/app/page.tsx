"use client";

import CreateTaskButtonAndModal from "@/components/CreateTaskButtonAndModal";
import ErrorMessage from "@/components/ErrorMessage";
import FilterTabs from "@/components/FilterTabs";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskList from "@/components/TaskList";
import ThemeToggle from "@/components/ThemeToggle";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    updateTaskStatus,
    deleteTask,
    refreshTasks,
    taskCounts,
    createTask,
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ThemeToggle />

        {/* Header */}
        <header className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Task Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Organize your work and life, finally.
            </p>
          </div>
        </header>
        <CreateTaskButtonAndModal createTask={createTask} />
        {/* Main Content */}
        <main>
          {/* Filter Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
            <FilterTabs
              activeFilter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />

            {/* Error Message */}
            {error && (
              <div className="p-4">
                <ErrorMessage message={error} onRetry={refreshTasks} />
              </div>
            )}

            {/* Task List */}
            <div className="p-4">
              {loading ? (
                <LoadingSpinner text="Loading tasks..." />
              ) : (
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={async (taskId, newStatus) => {
                    await updateTaskStatus(taskId, newStatus);
                  }}
                  onDelete={deleteTask}
                />
              )}
            </div>
          </div>
        </main>
      </div>
      
    </div>
  );
}
