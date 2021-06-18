require("dotenv").config();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const AuthModel = require("../models/auth.model");
const { Strategy, ExtractJwt } = require("passport-jwt");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        var name = req.body.name;
        var email = req.body.email;
        const user = await AuthModel.create({
          username,
          password,
          name,
          email,
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await AuthModel.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.Secret_Key,
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.auth);
      } catch (error) {
        done(error);
      }
    }
  )
);
