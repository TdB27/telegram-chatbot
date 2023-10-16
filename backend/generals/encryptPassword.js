const bcrypt = require("bcrypt-nodejs");

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

module.exports = { encryptPassword };
