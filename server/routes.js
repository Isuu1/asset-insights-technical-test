/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");

const router = express.Router();

module.exports = router;

//Database schema
const Schema = require("./schemas/schema");

//Get all users
router.get("/", async (req, res) => {
  try {
    const data = await Schema.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Add a new user
router.post("/post", async (req, res) => {
  const data = new Schema({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });

  try {
    const dataToSaveInDb = await data.save();
    res.status(200).json(dataToSaveInDb);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

//Delete a user
router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await Schema.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const data = await Schema.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
