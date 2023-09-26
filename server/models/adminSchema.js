//importations des modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//creation de document costumer
const schema = mongoose.Schema({
    username:{type:String, require:true, unique:true},
    numero :{type:String, require:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, require:true},
    resetPasswordToken:{type:String},
    isAdmin:{ type:Boolean, default:true},
},{timestamps:true});   
    
schema.plugin(uniqueValidator);   

//exportation 
module.exports = mongoose.model('Administrateurs',schema)