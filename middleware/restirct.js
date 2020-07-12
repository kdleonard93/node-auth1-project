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
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }

        // check if the role in our token is above or equal to the required role for the endpoint
        if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
          return res.status(401).json(authError);
        }

      // user is authenticated!
      next();
    } catch (err) {
      next(err);
    }
  };
}};

module.exports = restrict;
