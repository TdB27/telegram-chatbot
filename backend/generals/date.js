function formatDateToLocaleBr(value) {
  let date = new Date(value);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return `${day}/${month}/${year} ${hour}:${minutes}`;
}

function formatDateToLocaleUsa(value) {
  let date = new Date(value);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return `${year}-${month}-${day} ${hour}:${minutes}`;
}

module.exports = { formatDateToLocaleBr, formatDateToLocaleUsa };
