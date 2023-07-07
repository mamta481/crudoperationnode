import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    clientId: {
      type: Number,
      required: true,
    },
    agencyId: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
    totalbill: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("client", clientSchema);
