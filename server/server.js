//importation des modules
const http = require('http')
const dotenv = require('dotenv')
const app = require('./app')
const Conversations = require('./models/collectionConversation')
const socketIO = require('socket.io')
//configurations
dotenv.config()
app.set(process.env.PORT || 3001)




const server = http.createServer(app)
const io = socketIO(server)

io.on('connection',(socket)=>{
  console.log('new connection');

  // enregistrement de nouveaux message
  socket.on('sendMessage',async({userId,senderId,newMessage})=>{
     try{
       const conversations = await Conversations.findOneAndUpdate(
        {userId, senderId},
        {$push:{discussions:{userId,newMessage}}},
        {upsert:true, new:true}
       );
      //  recuperation du message
      io.emit('receivMessage',conversations)
     }catch(err){
      res.status(500).json(err)
     }
  });
  socket.on('disconnect',()=>{
    console.log('user deconnecter')
  })
})

  
  //start server
server.listen(process.env.PORT,()=>{
    console.log('Server en marche sur PORT:',process.env.PORT)
})
  


