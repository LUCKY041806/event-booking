import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";

// GET all events
export async function GET() {
  await connectDB();
  const events = await Event.find();
  return NextResponse.json(events);
}

// CREATE event
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const event = await Event.create(data);
  return NextResponse.json(event);
}

// DELETE event
export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
