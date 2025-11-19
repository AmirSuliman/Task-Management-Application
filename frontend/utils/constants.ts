// Task status constants
export const TASK_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
};

// Status display configuration
export const STATUS_CONFIG = {
  [TASK_STATUS.PENDING]: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    badgeColor: "bg-yellow-500",
    nextStatus: TASK_STATUS.IN_PROGRESS,
    nextLabel: "Start",
  },
  [TASK_STATUS.IN_PROGRESS]: {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    badgeColor: "bg-blue-500",
    nextStatus: TASK_STATUS.COMPLETED,
    nextLabel: "Complete",
  },
  [TASK_STATUS.COMPLETED]: {
    label: "Completed",
    color: "bg-green-100 text-green-800 border-green-300",
    badgeColor: "bg-green-500",
    nextStatus: null,
    nextLabel: null,
  },
};

// Filter tabs configuration
export const FILTER_TABS = [
  { id: "all", label: "All Tasks" },
  { id: TASK_STATUS.PENDING, label: "Pending" },
  { id: TASK_STATUS.IN_PROGRESS, label: "In Progress" },
  { id: TASK_STATUS.COMPLETED, label: "Completed" },
];

// Form validation
export const VALIDATION = {
  TITLE_MAX_LENGTH: 100,
  TITLE_MIN_LENGTH: 1,
};
