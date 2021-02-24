const router = require("express").Router();

const usersRouter = require("./users");
const loginRouter = require("./login");
const catsRouter = require("./cats");

router.use("/users", usersRouter);
router.use("/login", loginRouter);
router.use("/cats", catsRouter);

module.exports = router;
