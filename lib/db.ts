import mongoose from "mongoose";

export const localConnection = mongoose.createConnection(
  process.env.LOCAL_MONGODB_URI!
);

export const atlasConnection = mongoose.createConnection(
  process.env.ATLAS_MONGODB_URI!
);

localConnection.on("connected", () => {
  console.log("✅ Local MongoDB Connected");
});

atlasConnection.on("connected", () => {
  console.log("✅ Atlas MongoDB Connected");
});

localConnection.on("error", (err) => {
  console.error("❌ Local MongoDB Error:", err);
});

atlasConnection.on("error", (err) => {
  console.error("❌ Atlas MongoDB Error:", err);
});
