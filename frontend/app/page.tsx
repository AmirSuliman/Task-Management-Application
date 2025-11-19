"use client";

import { useTasks } from "@/hooks/useTasks";
import CreateTaskForm from "@/components/CreateTaskForm";
import FilterTabs from "@/components/FilterTabs";
import TaskList from "@/components/TaskList";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTaskStatus,
    deleteTask,
    refreshTasks,
    taskCounts,
  } = useTasks();

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
          <CreateTaskForm onCreateTask={createTask} isCreating={loading} />

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
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
