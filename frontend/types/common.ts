export type TaskStatus = "pending" | "in-progress" | "completed";

export type Task = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  status: TaskStatus;
};
