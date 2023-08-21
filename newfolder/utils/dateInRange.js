const { v4: uuidv4 } = require("uuid");

exports.dateInRange = async (date, entityId, entityType) => {
  const dates = [];
  let [startDate, endDate] = date.split(",");
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  while (startDate <= endDate) {
    dates.push({
      id: uuidv4(),
      date: startDate.toISOString(),
      entityId,
      entityType,
    });
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
};
