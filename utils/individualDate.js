const { v4: uuidv4 } = require("uuid");

exports.indvidualDate = async (date, entityId, entityType) => {
  const dates = [];
  for (let i = 0; i < date.length; i++) {
    dates.push({
      id: uuidv4(),
      date: new Date(date[i]).toISOString(),
      entityId,
      entityType,
    });
  }
  return dates;
};
