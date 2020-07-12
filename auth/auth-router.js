const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../users/user-model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const savedUser = await userModel.add(req.body);
    return res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findBy({ username }).first();
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return res.status(200).json({ message: `Welcome, ${user.username}!` });
    } else {
      return res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
