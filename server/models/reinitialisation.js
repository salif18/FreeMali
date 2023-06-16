//importation
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  numero:{type:Number}
},{timestamps:true})

module.exports =mongoose.model('Offres',Schema)