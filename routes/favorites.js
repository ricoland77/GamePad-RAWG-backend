const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Voir les favoris

router.post("/favorites", async (req, res) => {
  const { token } = req.body;
  try {
    const member = await User.findOne({
      token: token,
    });
    const favoriteArray = member.favorites;
    res.status(200).json(favoriteArray);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// ajouter un favoris
router.put("/favorite", async (req, res) => {
  const { favorite, token } = req.body;
  try {
    const member = await User.findOne({
      token: token,
    });
    const favoriteArray = member.favorites;
    member.favorites.push(favorite);
    // console.log("ici", favoriteArray);
    member.save();
  } catch (error) {
    res.status(400).json({ message: "You have merdé" });
  }
});

// Supprimer un favoris
router.put("/deletefav", async (req, res) => {
  const { gameId, token } = req.body;
  try {
    const member = await User.findOne({
      token: token,
    });
    const favoriteArray = member.favorites;

    favoriteArray.splice(
      favoriteArray.findIndex((a) => a.id === gameId),
      1
    );

    member.save();
    res.status(200).json(favoriteArray);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

module.exports = router;
