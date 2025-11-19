import React, { useState } from "react";
import { validateTitle } from "@/utils/helpers";
import { VALIDATION } from "@/utils/constants";
import toast from "react-hot-toast";

export default function CreateTaskForm({
  onCreateTask,
  showHeader = true,
}: {
  onCreateTask: (taskData: {
    title: string;
    description?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  showHeader?: boolean;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ title?: string; submit?: string }>({});
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    const titleError = validateTitle(title);
    if (titleError) {
      setErrors({ title: titleError });
      return;
    }

    setErrors({});

    // Create task
    setLoading(true);
    const result = await onCreateTask({ title, description });
    setLoading(false);

    if (result.success) {
      // Reset form
      setTitle("");
      setDescription("");

      // Show success message
      toast.success("Task created successfully!");
    } else {
      setErrors({ submit: result.error });
    }
  };

  const remainingChars = VALIDATION.TITLE_MAX_LENGTH - title.length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
      {showHeader && (
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Create New Task
        </h2>
      )}


      {errors.submit && (
        <div className="mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg p-3">
          <p className="text-sm text-red-800 dark:text-red-200">{errors.submit}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            maxLength={VALIDATION.TITLE_MAX_LENGTH}
            className={`
              w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500
              ${
                errors.title
                  ? "border-red-300 bg-red-50 dark:bg-red-950/30"
                  : "border-gray-300 dark:border-slate-700"
              }
            `}
            disabled={loading}
          />
          <div className="flex justify-between mt-1">
            {errors.title ? (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.title}
              </p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Required field
              </p>
            )}
            <p
              className={`text-sm ${
                remainingChars < 20
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {remainingChars} chars left
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Optional field
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Create Task"
          )}
        </button>
      </form>
    </div>
  );
}
