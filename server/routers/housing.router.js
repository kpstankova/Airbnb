const express = require("express");
const {
  getHousings,
  createHousing,
  createReservtion,
  addItemToWishlist,
  revomeItemFromWishlist,
  getWishlist,
} = require("../controllers/housing.controller");
const passport = require("../auth/passportConfig");
const { removeItem } = require("../services/wishlistService");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("access-jwt", { session: false }),
  getHousings
);

router.post(
  "/",
  //   passport.authenticate("blacklist-jwt", { session: false }),
  passport.authenticate("access-jwt", { session: false }),
  createHousing
);

router.post(
  "/reservation",
  passport.authenticate("access-jwt", { session: false }),
  createReservtion
);

router.post(
  "/wishlist",
  passport.authenticate("access-jwt", { session: false }),
  addItemToWishlist
);

router.delete(
  "/wishlist",
  passport.authenticate("access-jwt", { session: false }),
  revomeItemFromWishlist
);

router.get(
  "/wishlist",
  passport.authenticate("access-jwt", { session: false }),
  getWishlist
);

module.exports = router;
