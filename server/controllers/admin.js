//importations des modules
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt"); 
const { PhoneNumberUtil } = require("google-libphonenumber");
const dotenv = require("dotenv");
const Administrateurs = require("../models/adminSchema"); 
dotenv.config();
  
// verifier si un numero de telephone est valable reel selon un pays
const isTelNumberValid = (numero) => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  try {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(numero, "ML");
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
};  


exports.signup = (req, res, next) => {
  const { username, numero, password, email } = req.body;
  Administrateurs.findOne({
    $or: [{ username: username }, { email: email }, { numero: numero }],
  }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "ce contact existe deja" });
    }
    if (!isTelNumberValid(numero)) {
      return res
        .status(400)
        .json({
          message:
            "Ce numero n'est pas un numero de telephone, veuillez entrez un numero de telephone valable",
        });
    }
  });
  //hashage du mot de passe
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const administrateurs = new Administrateurs({
        ...req.body,
        password: hash,
      });
      //sauvegardement du client
      administrateurs
        .save()
        .then((user) => {
          res.status(201).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.KEY_TOKEN, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//fonction pour se connecter a un compte
exports.login = (req, res, next) => {
  //recuperation des donnees du corps de la requete
  const { contacts, password } = req.body;
  //verification de l'email ou du numero de telephone
  Administrateurs.findOne({
    $or: [{ numero: contacts }, { email: contacts }],
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Ce compte n'existe pas" });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Mot de passe incorrect" });
            } else {
              return res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.KEY_TOKEN, {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//pour user de recuperer ses donnees
exports.getAdmin_data = async (req, res, next) => {
  const { userId } = req.params;
  Administrateurs.find({ _id: userId })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ err }));
};

//DELETE USER
exports.deleteAdmin = (req, res, next) => {
  const { id } = req.params;
  Administrateurs.findByIdAndDelete({ _id: id })
    .then(() => res.status(200).json({ message: "user delete" }))
    .catch((err) => res.status(400).json({ err }));
};
