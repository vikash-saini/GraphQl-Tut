import mongoose from "mongoose";

const quoteModel = new mongoose.Schema({
  quote: { type: String, required: true },
  by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("Quote", quoteModel);
