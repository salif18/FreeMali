const express = require('express')
const cors = require('cors')
const connection = require('./key/MongoDB_Key')
const app = express()
const userRouter = require('./routes/users')
const profileRouter = require('./routes/userProfile')
const offreRouter = require('./routes/offres')
const conversRouter = require('./routes/conversations')
app.use(cors())
app.use(express.json())

// les fonction de route
app.use('/auth',userRouter)
app.use('/profiles',profileRouter)
app.use('/offres',offreRouter)
app.use('/conversations',conversRouter)
module.exports = app