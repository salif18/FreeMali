//importation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.KEY_TOKEN);
    const userId = decodedToken.userId;
    (req.auth = {
      userId: userId,
    }),
      next(); 
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "erreur authentification",
      err,
    });
  }
};
