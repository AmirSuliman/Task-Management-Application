import { STATUS_CONFIG } from "@/utils/constants";
import { formatDate } from "@/utils/helpers";

export default function TaskItem({ task }) {
  const statusConfig = STATUS_CONFIG[task.status];

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
          </div>
        </div>
      </div>
    </>
  );
}
