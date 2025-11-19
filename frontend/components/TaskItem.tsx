import { useState } from "react";
import { STATUS_CONFIG } from "@/utils/constants";
import { formatDate } from "@/utils/helpers";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Task, TaskStatus } from "@/types/common";

export default function TaskItem({
  task,
  onUpdateStatus,
  onDelete,
}: {
  task: Task;
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  onDelete: (taskId: string) => Promise<{ success: boolean; error?: string }>;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const statusConfig = STATUS_CONFIG[task.status];

  const handleStatusUpdate = async () => {
    if (!statusConfig.nextStatus || isUpdating) return;

    setIsUpdating(true);
    await onUpdateStatus(task.id, statusConfig.nextStatus as TaskStatus);
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await onDelete(task.id);
    if (result.success) {
      setShowDeleteModal(false);
    }
    setIsDeleting(false);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-sm border-l-4 ${statusConfig.color} p-4 hover:shadow-md transition-shadow`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}
              >
                <span
                  className={`w-2 h-2 mr-1.5 rounded-full ${statusConfig.badgeColor}`}
                ></span>
                {statusConfig.label}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(task.createdAt)}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1 break-words">
              {task.title}
            </h3>

            {/* Description */}
            {task.description && (
              <p className="text-gray-600 text-sm mb-3 break-words whitespace-pre-wrap">
                {task.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              {statusConfig.nextStatus && (
                <button
                  onClick={handleStatusUpdate}
                  disabled={isUpdating}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUpdating ? (
                    <>
                      <svg
                        className="animate-spin -ml-0.5 mr-1.5 h-3 w-3"
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
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3.5 h-3.5 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {statusConfig.nextLabel}
                    </>
                  )}
                </button>
              )}

              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={isDeleting}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        taskTitle={task.title}
        isDeleting={isDeleting}
      />
    </>
  );
}
