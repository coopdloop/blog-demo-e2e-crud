import { NextRequest, NextResponse } from "next/server";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";
export async function GET(
  req: NextRequest,
  // allow slug to be passed in as a query param
  { params }: { params: { slug: number } }
): Promise<NextResponse<taskApi.getTasksDataApiResponse["tasks_data"]>> {
  const { searchParams } = new URL(req.url)
  const user_id:number = Number(searchParams.get("user_id"))
  console.log("GET /api/v1/get-tasks",user_id);
  let tasks = undefined;
  try {
    tasks = await taskModel.getTasks(user_id);
    return NextResponse.json(tasks.tasks_data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ ...error, success: false }, { status: 422 });
  }
}
