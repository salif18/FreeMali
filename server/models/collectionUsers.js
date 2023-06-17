//importation modules
const mongoose= require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//creation table
const Schema = mongoose.Schema({
   
    email:{type:String,required:true,unique:true},
    numero:{ type:String, required:[true,'Veuillez entrer votre numero de telephone'],
        unique:true,
        trim:true
    },
    resetPasswordToken:{type:String},
    password:{ type:String, required:[true, 'Veuillez entrer un mot de passe'],
         trim:true
        // maxLength:[9,'Le mot de passe doit contenir au moins 8 a 9 characteres']
    },
    isPrestataire:{ type:Boolean, default:false },
    status:{type:String,default:'En cours'}
},{timestamps:true})

Schema.plugin(uniqueValidator)

//exportation
module.exports = mongoose.model('Users',Schema)