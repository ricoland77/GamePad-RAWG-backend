const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const userRoutes = require("./routes/user");
const homeRoutes = require("./routes/home");
const gameRoutes = require("./routes/game");
app.use(userRoutes);
app.use(homeRoutes);
app.use(gameRoutes);

app.all("*", function (req, res) {
  res.json({ message: "this page does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
