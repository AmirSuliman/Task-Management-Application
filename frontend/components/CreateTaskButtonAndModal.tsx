import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";

const CreateTaskButtonAndModal = ({ createTask }: { createTask: (taskData: { title: string; description?: string }) => Promise<{ success: boolean; error?: string }>; }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

 
    return (
        <>
        <div className="flex items-center justify-end mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create New Task
          </button>
        </div>

        {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCreateModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-2xl">
            <div className="rounded-xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-200 dark:border-slate-800 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create New Task
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-full p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close modal"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <CreateTaskForm
                onCreateTask={async (taskData) => {
                  const result = await createTask(taskData);
                  if (result.success) {
                    setIsCreateModalOpen(false);
                  }
                  return result;
                }}
                showHeader={false}
              />
            </div>
          </div>
        </div>
      )}
        </>
    )
}

export default CreateTaskButtonAndModal;