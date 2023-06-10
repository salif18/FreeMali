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
const io = socketIO(server,{
  cors:{
    origin:'http://localhost:3000',
    methods:['GET','POST']
  }
})

io.on('connection',(socket)=>{
  console.log(`new connection ${socket.id}`);

  //recevoire et enregistrement de nouveaux message
  socket.on('send_message',async(discussions)=>{
     try{
       const conversations = await Conversations.updateOne(
        // {_id:id},
        {$push:{discussions:discussions}},
        {upsert:true, new:true}
       );
    
  socket.broadcast.emit('receive_message',conversations)
 }catch(err){
      console.log(err)
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
  


