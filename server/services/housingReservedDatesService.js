const HousingReservedDates = require("../models/HousingReservedDates");

const createReservedDates = async (housingId, guestId, startDate, endDate) => {
  return await HousingReservedDates.query().insert({
    housing_id: housingId,
    guest_id: guestId,
    start_date: startDate,
    end_date: endDate,
  });
};

module.exports = {
  createReservedDates,
};
