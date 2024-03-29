function existsOrError(value, msg) {
  if (!value) throw msg;
  if (typeof value === "string" && !value.trim()) throw msg;
}

function notExistsOrError(value, msg) {
  try {
    existsOrError(value, msg);
  } catch (msg) {
    return;
  }
  throw msg;
}

module.exports = { existsOrError, notExistsOrError };
