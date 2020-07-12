const express = require("express");
const Users = require("./users-model");
const restrict = require("../middleware/restrict");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    res.json(await Users.add({ id }));
  }
});

router.get("/", restrict(), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json(await Users.find(id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
