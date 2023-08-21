const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./route/users");
const cdRoutes = require("./route/cd");
const adminRoutes = require("./route/admin");
const { addUsers, sendNotification } = require("./utils/cronJob");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRoutes);
app.use("/cd", cdRoutes);
app.use("/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT);
    addUsers.start();
    sendNotification.start();
  })
  .catch((err) => {
    console.log(err);
  });
