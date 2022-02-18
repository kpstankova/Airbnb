const Wishlist = require("../models/Wishlist");
const Housing = require("../models/Housing");

const addItem = async (userId, housingId) => {
  return await Wishlist.query().insert({
    user_id: userId,
    housing_id: housingId,
  });
};

const removeItem = async (userId, housingId) => {
  return await Wishlist.query()
    .where({
      user_id: userId,
      housing_id: housingId,
    })
    .del();
};

const getUserWishlist = async (userId) => {
  const housingIds = await Wishlist.query().select(["housing_id"]).where({
    user_id: userId,
  });
  const ids = housingIds.map((item) => item.housing_id);
  return await Housing.query().where("id", ids);
};

module.exports = {
  addItem,
  removeItem,
  getUserWishlist,
};
