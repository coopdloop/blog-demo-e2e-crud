import { NextRequest, NextResponse } from "next/server";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";
import { format } from "date-fns";
export async function POST(
  req: NextRequest
): Promise<
  NextResponse<taskApi.createTaskDataApiResponse>
> {

  const body = await req.json();
  console.log(body)
  try {
    const taskParams = taskApi.TaskData.parse(body);
    taskParams.due_date = format(new Date(taskParams.due_date!), "MM-DD-YYYY");
    console.log(`Creating task: ${JSON.stringify(taskParams)}`);
    console.log("POST /api/v1/create-task");
    // CREATE TASK BY PARAMS
    const task = await taskModel.addTask(taskParams);
    return NextResponse.json({ ...task });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { ...error, success: false },
      { status: 422 }
    );
  }
}
