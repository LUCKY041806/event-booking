import mongoose from "mongoose";

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

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
