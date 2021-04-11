const express = require("express");
const authRoute = require("./auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Auth Service Already Running",
  });
});

router.use("/auth", authRoute);

router.all("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "Url is not valid, please check the documentation",
  });
});

module.exports = router;