const express = require("express");
const router = express.Router();
const Resident = require("../models/resident.model");
const upload = require("../utils/file-upload");
const protect = require("../middlewares/protect");

//get flats according to manager_id
router.get("/:manager_id/:flat_id", async (req, res) => {
  const user_id = req.params.manager_id;
  const id = req.params.flat_id;
  //   console.log(id);
  const residents = await Resident.find({ manager_id: user_id, flat_id: id });
  res.status(200).json({ data: residents });
});

//add flat by manager_id
router.post("/add", protect, async (req, res) => {
  const user = req.user;

  console.log(req.body);

  const resident = await Resident.create({
    name: req.body.name,
    age: +req.body.age,
    gender: req.body.gender,
    flat_id: req.body.flat_id,
    manager_id: user._id,
  });
  console.log(resident);
  res.status(201).json({ status: "resident added", data: resident });
});

//update flat by manager_id
router.put("/:resident_id/update", protect, async (req, res) => {
  const user = req.user;
  const resident_id = req.params.resident_id;
  const resident = await Resident.findById(resident_id).lean().exec();
  const data = req.body;

  const newData = { ...resident, ...data };
  console.log(newData);
  const updatedResident = await Resident.findByIdAndUpdate(
    resident_id,
    newData,
    {
      new: true,
    }
  );
  res.status(201).json({ status: "resident updated", data: updatedResident });
});

router.delete("/:resident_id", async (req, res) => {
  const id = req.params.resident_id;
  //   console.log(id);
  const resident = await Resident.findByIdAndDelete(id);
  res.status(200).json({ data: "Deleted" });
});

module.exports = router;
