const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/rpg", async (req, res) => {
  const id = req.query.id || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${
        process.env.KEY_RAWG
      }&genres=${"role-playing-games-rpg"}`,
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
