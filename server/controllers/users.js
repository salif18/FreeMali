//importation
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/collectionUsers"); 
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
//const twilio = require("twilio");
const { PhoneNumberUtil } = require("google-libphonenumber");
//configuration
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
  const { numero, email } = req.body;

  Users.findOne({
    $or: [{ numero: numero }, { email: email }],
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "Le numéro de téléphone ou l'email existe déjà",
        });
      }

      // Si le code continue à s'exécuter ici, cela signifie que l'utilisateur n'existe pas encore,
      // vous pouvez donc poursuivre le traitement.

      // Vérifier si le numéro de téléphone est valide
      // if (!isTelNumberValid(numero)) {
      //   return res.status(400).json({
      //     message:
      //       "Ce numéro n'est pas un numéro de téléphone valide, veuillez entrer un numéro de téléphone valide",
      //   });
      // }

      // Hash du mot de passe et enregistrement de l'utilisateur
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
                token: jwt.sign(
                  { userId: user._id },
                  process.env.KEY_TOKEN,
                  { expiresIn: "24h" }
                ),
              })
            )
            .catch((err) => res.status(500).json({ err }));
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

//login user 
exports.login = (req, res, next) => {
  const { contacts } = req.body;
  Users.findOne({
    $or: [{ email: contacts }, { numero: contacts }],
  })
    .then((user) => {
      if (!user) {
        const errorMessage = "Votre numero est incorrect";
        return res.status(401).json({ message: errorMessage });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            const errorMessage = "Votre mot de passe est incorrect";
            return res.status(401).json({ message: errorMessage });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.KEY_TOKEN, { expiresIn: "24h" }),
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


//recuperer mes donnes users
exports.modifyUser = async (req, res, next) => {
  const { id } = req.params;
  const {newStatus} = req.body
  console.log(id)
  console.log(newStatus)
  Users.findOneAndUpdate(
    { _id: id },
    {$set:{isPrestataire:newStatus}},
    {new : true}
    )
    .then(() => res.status(200).json({message:'status change'}))
    .catch((err) => res.status(400).json({ err }));
};


//suppression de compte user
exports.userDelete = (req, res, next) => {
  Users.findByIdAndRemove({ _id: req.params.id })
    .then(() =>
      res.status(200).json({ Confirmation: "Votre compte a été supprimé" })
    )
    .catch((err) => res.status(400).json({ err }));
};

// reinitialisation 
exports.Reinitialisation = async (req, res) => {
  const { numero, email } = req.body;

  try {
    const users = await Users.findOne({ 
      $or :[{email },{numero}] 
    });
    if (!users) {
      return res
        .status(404)
        .json({ message: "Cet email n'existe pas ou ce numero n'existe pas" });
    };
    const token = jwt.sign({ userId: users._id }, process.env.KEY_TOKEN , { expiresIn: "24h" });

    // enregistrer le token en ajoutant un nouveau champ resetToken a user
    users.resetPasswordToken = token;
    await users.save();
    
    //lien de confirmation
    const linkConfirm = `http://localhost:3000/reinitialisation/${users.resetPasswordToken}`
    // envoyer le token de renitialisation a user par son mail ou numero ou automatiquement vers le front
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "465",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOption = {
      from: "FreeMali",
      to: email,
      subject: "Code de reinitialisation de mot de passe",
      text: `Merci de cliquez sur ce lien pour réinitialiser votre mot de passe : ${linkConfirm}`,
    };
 
    transporter.sendMail(mailOption); 

    //envoyer sur numero
    // const client = twilio(process.env.accountSid, process.env.authToken);
    // client.messages
    //   .create({
    //     body:mailOption['text'],
    //     from:parseInt(process.env.YOUR_TWILIO_PHONE_NUMBER),
    //     to: parseInt(numero), 
    //   })  
    //   .then((message) => console.log(message.sid))
    //   .catch((error) => console.error(error)); 

    return res
      .status(200)
      .json({message:'Un message avec le code a ete envoye sur ton gmail'});
  } catch (error) {
    return res.status(500).json({ message: "Erreur de server" });
  }
}; 
 
exports.Validation = async (req, res) => {
  const { token, password, confirmPassword } = req.body;
 
  try {
    const users = await Users.findOne({ resetPasswordToken: token });
    if (!users) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Verifier si les mot de passe sont conforment
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Les mots de passe ne correspondent pas" });
    }

    // Hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // mis a jour du mot de passe et vide le resetPasswordToken
    users.password = hashedPassword;
    users.resetPasswordToken = "";
    await users.save();

    return res
      .status(200)
      .json({ message: "Votre mot de passe a été réinitialisé avec succès" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


//STATYSTICS USERS TO LOG
exports.statsUsers = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const stats = await Users.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).send(stats);
  } catch (err) {
    res.status(500).json({ err });
  }  
};