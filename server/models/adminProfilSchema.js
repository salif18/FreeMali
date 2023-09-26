//importation des modules
const mongoose = require('mongoose');

//creation du document profil
const schema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, require:true },
    photo:{ type: String},
    prenom:{ type: String },
    nom:{ type: String },
    numero:{ type: Number },
    email:{ type: String }, 
    isAdmin:{type:Boolean, default:true}
},{timestamps:true});

//exportation
module.exports = mongoose.model('AdminProfils',schema);