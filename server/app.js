//importations
const express = require('express')
const cors = require('cors')
const path = require('path')
const Databases_MongoDB = require('./database/mongoDB')
const app = express()
const userRouter = require('./routes/users')
const profileRouter = require('./routes/userProfile');
const profilAdmin_Router = require('./routes/adminProfil');
const offreRouter = require('./routes/offres')
const chatRouter = require('./routes/chat')
const messageRouter = require('./routes/message')
const notificationRouter = require('./routes/notifications');
const messageAdminRouter = require('./routes/messageAdmin');
const archiveCourierRouter = require('./routes/archiveCourier');
const recomandationRouter = require('./routes/recomandation');
const videosRtr = require('./routes/videos');
const imagesRtr = require('./routes/images')
//configurations
app.use(cors())
app.use(express.json()) 
app.use('/images',express.static(path.join(__dirname,'images')))
app.use('/videos',express.static(path.join(__dirname,'videos')))

// les fonctions de route
app.use('/auth',userRouter)
app.use('/profiles',profileRouter);
app.use('/profils/admin', profilAdmin_Router);
app.use('/offres',offreRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter);
app.use('/courriers', messageAdminRouter);
app.use('/archives/couriers', archiveCourierRouter);
app.use('/notifications',notificationRouter);
app.use('/recomandations', recomandationRouter);
app.use('/videos',videosRtr)
app.use('/images',imagesRtr)

//connection a la base de donnees
Databases_MongoDB();
  
//exportation de l'application
module.exports = app  