export type Status =
  | "Todo"
  | "In Progress"
  | "Review"
  | "Done";
export interface Activity {
  action: string;
  createdAt: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}
export interface Comment {
  _id?: string;
  text: string;
  createdAt: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}
export interface KanbanTask {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: Status;
  activity: Activity[];
  comments: Comment[];
  project?: string;
  assignedTo?:
    | string
    | {
        _id: string;
        name: string;
        email: string;
      };
  createdBy?: string;
  dueDate?: string;
  dueTime?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type Columns = Record<
  Status,
  KanbanTask[]
>;