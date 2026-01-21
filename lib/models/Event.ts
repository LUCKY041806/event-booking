import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  price: Number,
  bannerUrl: String,
  isFeatured: Boolean,
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
