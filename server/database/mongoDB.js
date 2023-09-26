const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoDB = () => {
  mongoose 
    .connect(`${process.env.DATA_BASES}`, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    })
    .then(() => console.log("Connection a database reussie"))
    .catch(() => console.log("Echec de connection  a database"));
};
                                                
module.exports = mongoDB;
