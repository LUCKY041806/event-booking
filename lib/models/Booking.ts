import mongoose from "mongoose";
import { localConnection, atlasConnection } from "../db";

const BookingSchema = new mongoose.Schema({
  eventName: String,
  generalQty: Number,
  vipQty: Number,
  vvipQty: Number,
  totalTickets: Number,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LocalBooking =
  localConnection.models.Booking ||
  localConnection.model("Booking", BookingSchema);

export const AtlasBooking =
  atlasConnection.models.Booking ||
  atlasConnection.model("Booking", BookingSchema);
