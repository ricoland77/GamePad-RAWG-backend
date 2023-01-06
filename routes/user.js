const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

// route pour s'inscrire sur Rawg
router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log(req.body);

    if (!username) {
      return res.status(400).json({ message: "Username is not filled in" });
    }

    if (!password) {
      return res.status(400).json({ message: "Create a password please" });
    }

    //venir vérifier qu'on envoie un mail !
    if (!email) {
      return res.status(400).json({ message: "Email is not filled in" });
    }

    const user = await User.findOne({ email: email }); // recherche d'un user par email

    // si user existe déjà, je return le message
    if (user) {
      return res.status(400).json({ message: "This email already exist" });
    }

    const salt = uid2(16); // générer un salt
    const hash = SHA256(salt + password).toString(encBase64); // générer un hash
    const token = uid2(64); // générer un token

    // création d'un nouveau user
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      token: token,
      salt: salt,
      hash: hash,
    });

    await newUser.save();
    res
      .status(200)
      .json({ message: "Your account has been created", token: newUser.token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// route pour se connecter
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(200).json({ message: "You are NOT allowed to log in" });
  }
  const newHash = SHA256(user.salt + password).toString(encBase64);
  if (newHash === user.hash) {
    res.status(200).json({
      _id: user._id,
      token: user.token,
      username: user.username,
    });
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
});

module.exports = router;
