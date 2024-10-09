/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");

const router = express.Router();

module.exports = router;

//Database schema
const Schema = require("./schemas/schema");

router.get("/", async (req, res) => {
  try {
    const data = await Schema.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/newuser", (req, res) => {
  res.send("Hello World!");
});
