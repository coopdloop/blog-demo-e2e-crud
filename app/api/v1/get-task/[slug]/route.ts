import { NextRequest, NextResponse } from "next/server";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";
export async function GET(
  req: NextRequest,
  // allow slug to be passed in as a query param
  { params }: { params: { slug: number } }
): Promise<NextResponse<taskApi.getTasksDataApiResponse>> {
  try {
    const task_id = taskApi.TaskDataRequest.parse({
      task_id: Number(params.slug),
    });
    console.log(`Getting Task: ${JSON.stringify(task_id)}`);
    console.log(`GET /api/v1/get-task/${task_id.task_id}`);
    let tasks = undefined;

    tasks = await taskModel.getTask(task_id);
    return NextResponse.json(tasks);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ ...error, success: false }, { status: 422 });
  }
}
