import { NextRequest, NextResponse } from "next/server";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: number } }
): Promise<NextResponse<taskApi.getTasksDataApiResponse>> {
  try { 
    const task_id = taskApi.TaskDataRequest.parse({
      task_id: Number(params.slug),
    });
    console.log(`Deleting User: ${JSON.stringify(task_id)}`);
    console.log("GET /api/v1/get-users");
    // CREATE TASK BY PARAMS
    const task = await taskModel.deleteTask(task_id.task_id);
    return NextResponse.json({ ...task });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ ...error, success: false }, { status: 422 });
  }
}
