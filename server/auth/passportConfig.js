const Passport = require("passport").Passport;
const passportJWT = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passportCustom = require("passport-custom");
const CustomStrategy = passportCustom.Strategy;
const AirbnbPassport = new Passport();
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const verifyUserFunction = async (email, password, done) => {
  try {
    const user = await User.query().where({ email: email }).first();
    console.log(user);

    if (!user) {
      return done("User or password are wrong", false);
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return done("User or password are wrong", false);
    }
    return done(null, user);
  } catch (err) {
    done(err);
  }
};

AirbnbPassport.use(
  "airbnb-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    verifyUserFunction
  )
);

AirbnbPassport.use(
  "access-jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    function (jwtPaylaod, done) {
      console.log("access-jwt STRATEGY");
      return done(null, jwtPaylaod);
    }
  )
);

// AirbnbPassport.use(
//   "airbnb-custom-local",
//   new CustomStrategy(async function (req, done) {})
// );

module.exports = AirbnbPassport;
