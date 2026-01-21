import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";

// CREATE BOOKING
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const booking = await Booking.create(body);

  return NextResponse.json({ success: true, booking });
}

// GET BOOKINGS
export async function GET() {
  await connectDB();

  const bookings = await Booking.find().sort({ createdAt: -1 });
  return NextResponse.json(bookings);
}

// DELETE BOOKING
export async function DELETE(req: Request) {
  await connectDB();

  const { id } = await req.json();
  await Booking.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
