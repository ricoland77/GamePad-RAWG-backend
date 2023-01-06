const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/discover/this-week", async (req, res) => {
  const id = req.query.id || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${
        process.env.KEY_RAWG
      }&dates=${"2022-12-27,2022-12-29"}`,
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
