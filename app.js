require("dotenv/config");
const express = require("express");
const app = express();
const postRouter = require("./routes/post");
const mongoose = require("mongoose");
const { routeNotFound } = require("./middleware/routeNotFound");
const { errorHandler } = require("./middleware/errorHandler");
const { InternalError } = require("./error");

mongoose.connect(process.env.DB_CONNECT, (err, res) => {
  if (err) {
    next(new InternalError(err));
  } else {
    console.log("Connection to Database Successfull !!");
  }
});

app.use(express.urlencoded());

app.use(express.json());

app.use("/posts", postRouter);

app.use(errorHandler);

app.use(routeNotFound);

const port = 3000;
app.listen(port, (err, res) => {
  if (err) {
    next(new InternalError(err));
  } else {
    console.log(`Server Running on port ${port} !!`);
  }
});
