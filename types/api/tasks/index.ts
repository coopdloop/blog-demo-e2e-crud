import { z } from "zod";

export const TaskData = z.object({
  task_id: z.number().optional(),
  user_id: z.number().nullable(),
  // task_category_id: z.number().nullable(),
  task_category_name: z.enum(["Frontend", "Backend", "Fullstack"]).nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  due_date: z.string().datetime().nullable(),
  status: z.enum([
    "New",
    "In Progress",
    "Closed",
    "Reopened",
    "Resolved",
    "Rejected",
  ]).nullable(),
});

export const TaskDataResponse = z.object({
  error: z.string().optional(),
  success: z.boolean(),
  task_data: TaskData.optional(),
});

export const TasksDataResponse = z.object({
  error: z.string().optional(),
  success: z.boolean(),
  tasks_data: z.array(TaskData).optional(),
});

export const TaskDataRequest = z.object({
  task_id: z.number(),
});

export type getTaskDataApiRequest = z.infer<typeof TaskDataRequest>;
export type getTaskDataApiResponse = z.infer<typeof TaskDataResponse>;
export type getTasksDataApiResponse = z.infer<typeof TasksDataResponse>;
export type createTaskDataApiRequest = z.infer<typeof TaskData>;
export type createTaskDataApiResponse = z.infer<typeof TaskDataResponse>;

const TasksDataArray = z.array(TaskData);

export type TasksArray = z.infer<typeof TasksDataArray>;

export const UserData = z.object({
  user_id: z.number(),
  username: z.string(),
  email: z.string(),
});

export const UserDataRequest = z.object({
  user_id: z.number(),
});

export const UserDataResponse = z.object({
  error: z.string().optional(),
  success: z.boolean(),
  user_data: UserData.optional(),
});

export type getUserDataApiRequest = z.infer<typeof UserDataRequest>;
export type getUserDataApiResponse = z.infer<typeof UserDataResponse>;
export type createUserDataApiRequest = z.infer<typeof UserData>;
export type createUserDataApiResponse = z.infer<typeof UserDataResponse>;
