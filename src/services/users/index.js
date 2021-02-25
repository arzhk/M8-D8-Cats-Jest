const express = require("express");
const userSchema = require("./schema");
const jwt = require("jsonwebtoken");
const usersRouter = express.Router();

/* usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await userSchema.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
}); */

const authorise = async (req, res, next) => {
  const token = req.cookies.accessToken;
  const { username } = await verifyJWT(token);
  req.username = username;
  next();
};

const verifyJWT = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) rej(err);
      res(decoded);
    })
  );

usersRouter.get("/me", authorise, async (req, res, next) => {
  try {
    res.send({ username: req.username });
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;

/*
WHEN ACCESSTOKEN EXPIRES,
    GET NEW ACCESSTOKEN BY CALLING REFRESH TOKEN ENDPOINT,
    ACCESSTOKEN EXPIRES QUICKLY, REFRESHTOKEN SLOWER
*/
