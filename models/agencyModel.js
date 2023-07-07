import mongoose from "mongoose";

const agencyschema = new mongoose.Schema(
  {
    agencyId: {
      type: Number,
      required: true,
      trim: true,
    },
    agencyname: {
      type: String,
      required: true,
      trim: true,
    },
    address1: {
      type: String,
      required: true,
      unique: true,
    },
    address2: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("agency", agencyschema);
