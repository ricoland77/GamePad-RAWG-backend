const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const userRoutes = require("./routes/user");
const homeRoutes = require("./routes/home");
const gameRoutes = require("./routes/game");
const lastRoutes = require("./routes/last");
const thisweekRoutes = require("./routes/thisWeek");
const nextweekRoutes = require("./routes/nextWeek");
const actionRoutes = require("./routes/action");
const strategyRoutes = require("./routes/strategy");
const rpgRoutes = require("./routes/rpg");
const favoritesRoutes = require("./routes/favorites");
app.use(userRoutes);
app.use(homeRoutes);
app.use(gameRoutes);
app.use(lastRoutes);
app.use(thisweekRoutes);
app.use(nextweekRoutes);
app.use(actionRoutes);
app.use(strategyRoutes);
app.use(rpgRoutes);
app.use(favoritesRoutes);

app.all("*", function (req, res) {
  res.json({ message: "this page does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
