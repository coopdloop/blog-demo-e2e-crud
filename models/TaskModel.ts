//file models/IntegrationModel.ts

import { Users, Tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as TaskApi from "@/types/api/tasks";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres({ ssl: "prefer" });
const db: PostgresJsDatabase = drizzle(client);

// TASKS ENDPOINTS

export const addTask = async (
  task: TaskApi.createTaskDataApiRequest
): Promise<TaskApi.getTasksDataApiResponse> => {
  try {
    const tasks_data = await db.insert(Tasks).values(task).returning();
    return { tasks_data: tasks_data, success: true, error: undefined };
  } catch (err: any) {
    return { success: false, error: err };
  }
};

export const getTask = async (
  task: TaskApi.getTaskDataApiRequest
): Promise<TaskApi.getTaskDataApiResponse> => {
  try {
    const task_data = await db
      .select()
      .from(Tasks)
      .where(eq(Tasks.task_id, task.task_id));
    return { ...task_data, success: true, error: undefined };
  } catch (err: any) {
    return { success: false, error: err };
  }
};

export const getTasks = async (
  user_id?: number
): Promise<TaskApi.getTasksDataApiResponse> => {
  try {
    let tasks_data = undefined;
    if (user_id) {
      tasks_data = await db
        .select()
        .from(Tasks)
        .where(eq(Tasks.user_id, user_id));
    } else {
      tasks_data = await db.select().from(Tasks);
    }
    return { tasks_data: tasks_data, success: true, error: undefined };
  } catch (err: any) {
    return { success: false, error: err };
  }
};

export const deleteTask = async (
  task_id: number
): Promise<TaskApi.getTasksDataApiResponse> => {
  try {
    // const tasks_data = await db.insert(Tasks).values(task).returning();
    const tasks_data = await db
      .delete(Tasks)
      .where(eq(Tasks.task_id, task_id))
      .returning();

    return { tasks_data: tasks_data, success: true, error: undefined };
  } catch (err: any) {
    return { success: false, error: err };
  }
};
// USERS ENDPOINTS
// TODO: move to user model

export const addUser = async (
  user: TaskApi.createUserDataApiRequest
): Promise<TaskApi.createUserDataApiResponse> => {
  try {
    await db.insert(Users).values(user);
    return { user_data: user, success: true, error: undefined };
  } catch (err: any) {
    return { success: false, error: err };
  }
};

export const getUser = async (
  user_id: TaskApi.getUserDataApiRequest
): Promise<TaskApi.getUserDataApiResponse> => {
  try {
    const user_data = await db
      .select()
      .from(Users)
      .where(eq(Users.user_id, user_id.user_id));
    return { ...user_data, success: true, error: undefined };
  } catch (err: any) {
    return { success: false, error: err };
  }
};

export const getUsers = async (): Promise<TaskApi.getUsersDataApiResponse> => {
  try {
    const users_data = await db.select().from(Users);
    return { user_data: users_data, success: true, error: undefined };
  } catch (err: any) {
    return { success: false, error: err };
  }
};
