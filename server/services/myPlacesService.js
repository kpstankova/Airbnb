const MyPlaces = require("../models/MyPlaces");

const addPlace = async (userId, housingId) => {
  return await MyPlaces.query().insert({
    user_id: userId,
    housing_id: housingId,
  });
};

module.exports = {
  addPlace,
};
