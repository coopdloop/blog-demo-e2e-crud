import { NextRequest, NextResponse } from "next/server";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";
export async function POST(
  req: NextRequest
): Promise<
  NextResponse<taskApi.createUserDataApiResponse>
> {
  const body = await req.json();
  try {
    const userParams = taskApi.UserData.parse(body);
    console.log(`Creating task: ${JSON.stringify(userParams)}`);
    console.log("POST /api/v1/create-user");
    // CREATE TASK BY PARAMS
    const user = await taskModel.addUser(userParams);
    return NextResponse.json({ ...user });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { ...error, success: false },
      { status: 422 }
    );
  }
}
