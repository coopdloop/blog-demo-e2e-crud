import { getDataFromToken } from "@/helpers/getDataFromToken";
import * as taskApi from "@/types/api/tasks";
import * as taskModel from "@/models/TaskModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const payload = await getDataFromToken(req);
    console.log("JWT", payload)
    const userId = payload.user_id;
    const user = await taskModel.getUser(userId);
    console.log("GET /api/v1/me", user)
    return NextResponse.json({ ...user});
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
