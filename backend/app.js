const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json({ urlencoded: false }));
app.use(cors());

//routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth/", authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server started at port 3k");
    });
  })
  .catch((err) => {
    console.log(err);
  });
