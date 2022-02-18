require("dotenv").config();
const util = require("util");
const fs = require("fs");
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const housingService = require("../services/housingService");
const housingReservedDatesService = require("../services/housingReservedDatesService");
const myPlacesService = require("../services/myPlacesService");
const wishlistService = require("../services/wishlistService");

const getHousings = async (req, res) => {
  try {
    const housings = await housingService.getHousings();
    return res.status(200).json(housings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createHousing = async (req, res) => {
  // prettier-ignore
  const { title, description, owner, rating, guests, city, long, lat, price, images} =
    req.body;
  try {
    const housing = await housingService.createHousing(
      title,
      description,
      owner,
      rating,
      guests,
      long,
      lat,
      city,
      price
    );
    const housingId = housing.id;
    const dirPath = `${process.env.HOUSING_PICS_FOLDER}${housingId}`;
    await mkdir(dirPath);
    let count = 1;
    images.forEach(async (image) => {
      const imagePath = `${dirPath}/${count++}.jpg`;
      await writeFile(imagePath, image);
    });
    await myPlacesService.addPlace(owner, housingId);
    return res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

const createReservtion = async (req, res) => {
  const { housingId, guestId, startDate, endDate } = req.body;
  try {
    const reservaion = await housingReservedDatesService.createReservedDates(
      housingId,
      guestId,
      startDate,
      endDate
    );
    const housing = await housingService.getHousingById(housingId);
    return res.status(200).json({ reservaion, housing });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addItemToWishlist = async (req, res) => {
  const { userId, housingId } = req.body;
  try {
    await wishlistService.addItem(userId, housingId);
    return res.status(200).json({ message: "Added to the wishlist" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const revomeItemFromWishlist = async (req, res) => {
  const { userId, housingId } = req.body;
  try {
    await wishlistService.removeItem(userId, housingId);
    return res.status(200).json({ message: "Removed from the wishlist" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const wishlist = await wishlistService.getUserWishlist(userId);
    return res.status(200).json(wishlist);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getHousings,
  createHousing,
  createReservtion,
  addItemToWishlist,
  revomeItemFromWishlist,
  getWishlist,
};
