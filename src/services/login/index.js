const express = require("express");
const userSchema = require("../users/schema");
const jwt = require("jsonwebtoken");
const loginRouter = express.Router();

loginRouter.get("/", async (req, res, next) => {
  try {
    const { username, password } = req.query;

    const isMatch = password === "aaaa";

    if (isMatch) {
      const token = await generateJWT({ username });
      console.log(token);
      res.cookie("accessToken", token, {
        path: "/",
        httpOnly: true,
        /*
        sameSite: "none",
        secure: true
        FOR PRODUCTION ONLY!!!!!
        */
      });
      /*   res.cookie("refreshToken", refreshToken, {
        path: ["/users/refreshToken", "/logout"],
        httpOnly: true,
      }); */
      res.send("Ok");
    }
  } catch (error) {
    next(error);
  }
});

const generateJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 10000 }, (err, token) => {
      if (err) rej(err);
      res(token);
    })
  );

module.exports = loginRouter;
