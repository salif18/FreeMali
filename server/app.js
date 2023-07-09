//importations
const express = require('express')
const cors = require('cors')
const path = require('path')
const Databases_MongoDB = require('./database/mongoDB')
const app = express()
const userRouter = require('./routes/users')
const profileRouter = require('./routes/userProfile')
const offreRouter = require('./routes/offres')
const chatRouter = require('./routes/chat')
const messageRouter = require('./routes/message')
const notificationRouter = require('./routes/notifications')

//configurations
app.use(cors())
app.use(express.json()) 
app.use('/images',express.static(path.join(__dirname,'images')))

// les fonctions de route
app.use('/auth',userRouter)
app.use('/profiles',profileRouter)
app.use('/offres',offreRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)
app.use('/notifications',notificationRouter)
 
//connection a la base de donnees
Databases_MongoDB();
  
//exportation de l'application
module.exports = app  