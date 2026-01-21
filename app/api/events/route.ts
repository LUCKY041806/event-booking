import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";

export async function GET() {
  await connectDB();
  const events = await Event.find();
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const event = await Event.create(body);
  return NextResponse.json(event);
}
