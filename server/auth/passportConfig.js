const Passport = require("passport").Passport;
const passportJWT = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passportCustom = require("passport-custom");
const CustomStrategy = passportCustom.Strategy;
const AirbnbPassport = new Passport();
const LocalStrategy = require("passport-local").Strategy;
const userService = require("../services/userService");
const jwtBlacklistService = require("../services/jwtBlacklistService");
const bcrypt = require("bcrypt");
require("dotenv").config();

const verifyUserFunction = async (email, password, done) => {
  try {
    const user = await userService.getUserByEmail(email);
    console.log(user);

    if (!user) {
      return done(null, false, { message: "User or password are wrong" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return done(null, false, { message: "User or password are wrong" });
    }

    if (!user.verified) {
      return done(null, false, { message: "Account is not verified!" });
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
    (jwtPaylaod, done) => {
      return done(null, jwtPaylaod);
    }
  )
);

AirbnbPassport.use(
  "refresh-jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
    },
    (payload, done) => {
      return done(null, payload);
    }
  )
);

AirbnbPassport.use(
  "blacklist-jwt",
  new CustomStrategy(async (req, done) => {
    let token;
    if (req.header.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (req.body.refreshToken) {
      token = req.body.refreshToken;
    }
    if (!token) {
      done(null, req);
    }

    const tokenIsBlacklisted = await jwtBlacklistService.checkToken(token);
    if (tokenIsBlacklisted) {
      done(null, false, { message: "Token blacklisted" });
    } else {
      done(null, req);
    }
  })
);

module.exports = AirbnbPassport;
