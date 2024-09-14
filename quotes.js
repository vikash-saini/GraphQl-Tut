import mongoose from "mongoose";

const quoteModel = new mongoose.Schema({
  quote: { type: String, required: true },
  by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const QuoteModel = mongoose.model("Quote", quoteModel);
