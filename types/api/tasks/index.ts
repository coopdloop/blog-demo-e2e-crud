import { z } from "zod";

export const TaskData = z.object({
  task_id: z.number().optional(),
  user_id: z.number(),
  task_category_id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  due_date: z.string().datetime(),
  status: z.enum([
    "New",
    "In Progress",
    "Closed",
    "Reopened",
    "Resolved",
    "Rejected",
  ]),
});

export const TaskDataResponse = z.object({
  error: z.string().optional(),
  success: z.boolean(),
  task_data: TaskData.optional(),
});

export const TaskDataRequest = z.object({
  task_id: z.number(),
});

export type getTaskDataApiRequest = z.infer<typeof TaskDataRequest>;
export type getTaskDataApiResponse = z.infer<typeof TaskDataResponse>;
export type createTaskDataApiRequest = z.infer<typeof TaskData>;
export type createTaskDataApiResponse = z.infer<typeof TaskDataResponse>;

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
