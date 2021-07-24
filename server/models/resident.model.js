const mongoose = require("mongoose");

const { Schema } = mongoose;

const residentSchema = new Schema(
  {
    name: String,
    gender: String,
    age: Number,
    flat_id: String,
    manager_id: String
  },
  {
    timestamps: true,
  }
);


const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;
