const bcrypt = require("bcryptjs");
const db = require("../database/config");

async function add(user) {
  // hash the password with a time complexity of 13
  user.password = await bcrypt.hash(user.password, 13);

  const [id] = await db("users").insert(user);
  return findById(id);
}

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

module.exports = {
  add,
  find,
  findBy,
  findById
};
