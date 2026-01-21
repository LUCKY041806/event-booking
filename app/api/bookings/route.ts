import { NextResponse } from "next/server";
import { LocalBooking, AtlasBooking } from "@/lib/models/Booking";

// CREATE BOOKING
export async function POST(req: Request) {
  const body = await req.json();

  const localBooking = await LocalBooking.create(body);
  const atlasBooking = await AtlasBooking.create(body);

  return NextResponse.json({ success: true, localBooking, atlasBooking });
}

// GET BOOKINGS
export async function GET() {
  const bookings = await LocalBooking.find().sort({ createdAt: -1 });
  return NextResponse.json(bookings);
}

// DELETE BOOKING
export async function DELETE(req: Request) {
  const { id } = await req.json();

  await LocalBooking.findByIdAndDelete(id);
  await AtlasBooking.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
