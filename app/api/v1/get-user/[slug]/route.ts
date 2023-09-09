import { NextRequest, NextResponse } from "next/server";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: number } }
): Promise<NextResponse<taskApi.getUserDataApiResponse>> {
  try {
    const user_id = taskApi.UserDataRequest.parse({ user_id: Number(params.slug) });
    console.log(`Getting User: ${JSON.stringify(user_id)}`);
    console.log("GET /api/v1/get-users");
    // CREATE TASK BY PARAMS
    const user = await taskModel.getUser(user_id.user_id);
    return NextResponse.json({ ...user });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ ...error, success: false }, { status: 422 });
  }
}
