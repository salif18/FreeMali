//importation modules
const mongoose= require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//creation table
const Schema = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    numero:{ type:String, required:true, unique:true, trim:true },
    resetPasswordToken:{type:String},
    password:{ type:String, required:true, trim:true },
    isPrestataire:{ type:Boolean, default:false },
    status:{type:String, default:'En cours'}
},{timestamps:true})

Schema.plugin(uniqueValidator)

//exportation
module.exports = mongoose.model('Users',Schema)