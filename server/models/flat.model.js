const mongoose = require("mongoose");

const { Schema } = mongoose;

const flatSchema = new Schema(
  {
    type: String,
    block: String,
    number: Number,
    manager_id: { type: String },
    images_urls: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  }
);

const Flat = mongoose.model("Flat", flatSchema);

module.exports = Flat;
