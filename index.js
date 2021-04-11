require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const {PORT} = process.env;

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Auth Service Already Running",
  });
});

app.listen(PORT, () => {
  console.log(`app listen on port ${PORT}`);
});