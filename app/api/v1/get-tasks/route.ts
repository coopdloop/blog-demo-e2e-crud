import { NextRequest, NextResponse } from "next/server";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";
export async function GET(
  req: NextRequest
): Promise<NextResponse<taskApi.getTasksDataApiResponse["tasks_data"]>> {
  try {
    console.log("GET /api/v1/get-tasks");
    const tasks = await taskModel.getTasks();
    return NextResponse.json(tasks.tasks_data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ ...error, success: false }, { status: 422 });
  }
}
