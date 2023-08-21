const { v4: uuidv4 } = require("uuid");
const Location = require("../model/lookup/location");

exports.fetchLocation = async (
  projectId,
  projectLocation,
  auditionLocation,
  workLocation
) => {
  const locations = [];
  const projectLocations = projectLocation.split(",");
  for (let i = 0; i < projectLocations.length; i++) {
    const location = await Location.findOne({
      locationName: projectLocations[i].toLowerCase(),
    });
    locations.push({
      id: uuidv4(),
      entityId: projectId,
      entityType: "project",
      locationId: location.id,
    });
  }

  const auditionLocations = auditionLocation.split(",");
  for (let i = 0; i < auditionLocations.length; i++) {
    const location = await Location.findOne({
      locationName: auditionLocations[i].toLowerCase(),
    });
    locations.push({
      id: uuidv4(),
      entityId: projectId,
      entityType: "projectAudition",
      locationId: location.id,
    });
  }

  const workLocations = workLocation.split(",");
  for (let i = 0; i < workLocations.length; i++) {
    const location = await Location.findOne({
      locationName: workLocations[i].toLowerCase(),
    });
    locations.push({
      id: uuidv4(),
      entityId: projectId,
      entityType: "projectWork",
      locationId: location.id,
    });
  }
  return locations;
};
