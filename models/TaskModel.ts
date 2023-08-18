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
): Promise<TaskApi.createTaskDataApiResponse> => {
  try {
    await db.insert(Tasks).values(task);
    console.log({ task_data: task, success: true, error: undefined })
    return { task_data: task, success: true, error: undefined };
  } catch (err: any) {
    console.log(err)
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

// USERS ENDPOINTS

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
