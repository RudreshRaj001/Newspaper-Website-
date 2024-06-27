import { getUserDetails } from "@/app/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserDetails();
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
