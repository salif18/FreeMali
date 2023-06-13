//importation
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Users = require("../models/collectionUsers");
const Profile = require("../models/collectionProfile");
const dotenv = require("dotenv");

//configuration
dotenv.config();

//registre user
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const users = new Users({
        ...req.body,
        password: hash,
      });
      users
        .save()
        .then((user) =>
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, `${process.env.KEY_TOKEN}`, {
              expiresIn: "24h",
            }),
          })
        )
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

//loin user
exports.login = (req, res, next) => {
  Users.findOne({ numero: req.body.numero })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Votre numero est incorrect" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Votre mot de passe est incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, `${process.env.KEY_TOKEN}`, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

//recuperation un utilisateur
exports.getOneUser = async (req, res, next) => {
  const { id } = req.params;
  Users.findOne({ _id: id })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ err }));
};

//tous utilisateurs avec leur profiles
exports.AllUsers = async (req, res, next) => {
  try {
    const users = await Users.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "userId",
          as: "profile",
        },
      },
      {
        $unwind: "$profile",
      },
    ]);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//recuperer mes donnes users
exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  Users.find({ _id: userId })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ err }));
};

//modifier profile
exports.updateProfile = (req, res, next) => {
  Users.findById({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ user: "modifier" }))
    .catch((err) => res.status(400).json({ err }));
};

//suppression de compte user
exports.userDelete = (req, res, next) => {
  Users.findByIdAndRemove({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ Confirmation: "Votre compte a ete supprimer" })
    )
    .catch((err) => res.status(400).json({ err }));
};
