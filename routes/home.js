require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/home", async (req, res) => {
  const search = req.query.search || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.KEY_RAWG}&search=${search}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
