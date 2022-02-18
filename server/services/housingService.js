const Housing = require("../models/Housing");

const createHousing = async (
  title,
  description,
  owner,
  rating,
  guests,
  long,
  lat,
  city,
  price
) => {
  return await Housing.query().insert({
    title: title,
    description: description,
    owner: owner,
    rating: rating,
    guests: guests,
    long: long,
    lat: lat,
    city: city,
    price: price,
  });
};

const getHousingById = async (housingId) => {
  return await Housing.query().where({ id: housingId }).first();
};

const getHousings = async () => {
  return await Housing.query();
};

module.exports = {
  createHousing,
  getHousingById,
  getHousings,
};
