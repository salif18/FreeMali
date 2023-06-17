//importation
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Users = require("../models/collectionUsers");
const Profile = require("../models/collectionProfile");
const dotenv = require("dotenv");
const nodemailer = require('nodemailer')
//configuration
dotenv.config(); 
 
const transporter =nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:'465',
  auth:{
    user:`salifmoctarkonate@gmail.com`, 
    pass:`Konatee18`,
  }
});
 
//registre user
exports.signup = (req, res, next) => {
  const {numero,email} = req.body
   Users.findOne({
    $or:[{numero:numero},{email:email}]
  })
  .then((user)=>{
    if(user){
    return res.status(400).json({messag:'Le numero de telephone ou email existe deja'})
}})
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
  const {contacts} = req.body
  Users.findOne({
    $or:[{email:contacts},{numero:contacts }] 
  })
    .then((user) => {
      if (!user) {
        const errorMessage="Votre numero est incorrect"
      return res.status(401).json({message:errorMessage  });
        
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            const errorMessage="Votre mot de passe est incorrect"
            return res.status(401).json({ message: errorMessage })
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
      res.status(200).json({ Confirmation: "Votre compte a été supprimé" })
    )
    .catch((err) => res.status(400).json({ err }));
};


// reinitialisation
exports.Reinitialisation = async (req, res) => {
  const { numero } = req.body;
  try {
    const users = await Users.findOne({ numero:numero });
    if (!users) {
      return res.status(404).json({ message: "Cet email n'existe pas" });
    }
    const token = jwt.sign({ userId: users._id }, `${process.env.KEY_TOKEN}`, { expiresIn: '24h' });
   
    // Save the token in the database for the user
    users.resetPasswordToken = token;
    await users.save();
   console.log(users.resetPasswordToken)
    // Send the reset password email with the token
    
const mailOption = {
  from:'salifmoctarkonate@gmail.com',
  to:users.email,
  subject:'Reinitialiser votre mot de passe',
  text:users.resetPasswordToken

}
    transporter.sendMail(mailOption,(err,info)=>{
      if(err){
        console.log('erreur',err)
      }else{
        console.log('email envoyer',info.messageId)
      }
    })
    return res.status(200).json({token:users.resetPasswordToken});//
  } catch (error) {
    return res.status(500).json({ message: 'Erreur de server' });
  }
};

exports.Validation =async (req, res) => {
  const { resetToken, password, confirmPassword  } = req.body;
  
  try {
    const users = await Users.findOne({ resetPasswordToken: resetToken });
    if (!users) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    // Verify if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the resetPasswordToken
    users.password = hashedPassword;
    users.resetPasswordToken = '';
    await users.save();

    return res.status(200).json({ message: 'Votre mot de passe a été réinitialisé avec succès' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

