export const convertSQLDateTimeToDateTimeString = sqlDateTime => {
  const date = new Date(sqlDateTime);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDateString = date
    .toLocaleDateString("en-US", options)
    .replace(",", "") // remove comma
    .replace(/\//g, "-") // replace slashes with dashes
    .replace(/(\d{1,2}):(\d{2}):(\d{2})/, function (match, p1, p2, p3) {
      // convert to 24-hour format
      const hours = parseInt(p1);
      const minutes = parseInt(p2);
      const seconds = parseInt(p3);
      return `${hours
        .toString()
        .padStart(
          2,
          "0"
        )}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    });
  return formattedDateString;
};
