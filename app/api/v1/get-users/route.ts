import { NextRequest, NextResponse } from "next/server";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<taskApi.getUsersDataApiResponse>> {
  // const user_id = params.user_id;
  try {
    console.log(`Getting Users`);
    console.log("GET /api/v1/get-users");
    // CREATE TASK BY PARAMS
    const user = await taskModel.getUsers();
    return NextResponse.json({ ...user });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ ...error, success: false }, { status: 422 });
  }
}
