const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");
const jwt = require("jsonwebtoken");

const rules = ["username", "password"];

function restrict(rule) {
  const authError = {
    message: "Invalid credentials",
  };

  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split("")[0];

      const user = await Users.findBy({ username }).first();
      // user exists
      if (!user) {
        return res.status(401).json(authError);
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        return res.status(401).json(authError);
      }

      // user is authenticated!
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
