//importations des modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");   
const nodemailer = require('nodemailer');  
const twilio = require("twilio");
const dotenv = require('dotenv');
//importations des models
const Administrateurs = require("../models/adminSchema");
dotenv.config()  
  

exports.reset = async (req, res) => {
  //recuperation des donnees de la requete 
  const { numero, email } = req.body;
  try {
    const users = await Administrateurs.findOne({ 
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
    const linkConfirm = `http://localhost:3001/reinitialisation/${users.resetPasswordToken}`
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
      text: `Cliquez sur ce lien pour réinitialiser votre mot de passe : ${linkConfirm}`,
    };
 
    transporter.sendMail(mailOption);

    //envoyer sur numero
    // const client = twilio(process.env.accountSid, process.env.authToken);
    // client.messages
    //   .create({
    //     body: "Votre message ici",
    //     from:process.env.YOUR_TWILIO_PHONE_NUMBER,
    //     to: numero,
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
    const users = await Administrateurs.findOne({ resetPasswordToken: token });
    if (!users) {
      return res.status(404).json({ message: "Token expire veuillez ressayer encore" });
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
