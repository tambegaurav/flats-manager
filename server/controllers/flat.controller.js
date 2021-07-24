const express = require("express");
const router = express.Router();
const Flat = require("../models/flat.model");
const upload = require("../utils/file-upload");
const protect = require("../middlewares/protect");

//get flats according to manager_id
router.get("/:manager_id", async (req, res) => {
  const id = req.params.manager_id;
  console.log(id);
  const flats = await Flat.find({ manager_id: id });
  res.status(200).json({ data: flats });
});

//add flat by manager_id
router.post("/add", protect, upload.array("flat_imgs"), async (req, res) => {
  const user = req.user;
  const files = req.files?.map((file) => file.path) || [];

  const flat = await Flat.create({
    type: req.body.type,
    block: req.body.block,
    number: +req.body.number,
    manager_id: user._id,
    images_urls: files,
  });
  console.log(req.body);
  console.log(flat);
  res.status(201).json({ status: "flat added", data: flat });
});

//update flat by manager_id
router.put("/:flat_id/update", protect, async (req, res) => {
  const user = req.user;
  const flat_id = req.params.flat_id;
  const flat = await Flat.findById(flat_id).lean().exec();
  const data = req.body;

  const newData = { ...flat, ...data };
  console.log(newData);
  const updatedFlat = await Flat.findByIdAndUpdate(flat_id, newData, {
    new: true,
  });
  res.status(201).json({ status: "flat updated", data: updatedFlat });
});

router.delete("/:flat_id", async (req, res) => {
  const id = req.params.flat_id;
  const flat = await Flat.findByIdAndDelete(id);
  res.status(200).json({ data: "Deleted" });
});

module.exports = router;
