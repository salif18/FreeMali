//importation des modules
const http = require('http')
const dotenv = require('dotenv')
const app = require('./app')
const Message = require('./models/message')
const Notifications = require('./models/notifications')
const socketIO = require('socket.io')

//configurations
dotenv.config()
app.set(process.env.PORT || 3002)

const server = http.createServer(app)
 const io = socketIO(server,
  { 
  cors:{
    origin:'http://localhost:3000',
    //origin:"http://localhost:3001", 
    methods:['GET','POST']
  }}
)
 
io.on('connection',(socket)=>{  
// envover vers backend et enregistrement de nouveaux message
  socket.on('send_message',async(data)=>{
    const message = new Message({
      conversationId:data.conversationId,
      sender:data.sender,
      receiver:data.receiver,
      text:data.text
    })
     message.save()
     .then(()=>{   
// envoyer de message vers frontend
  io.emit('receive_message',message)
 })
  .catch((err)=>console.log(err))
  });
 
  socket.on('disconnect',()=>{
    console.log('deconnecter')
  })

  // notification
  socket.on('send_notifications',(data)=>{
    const {senderId,receiverId,description,type} = data
    const notifications = new Notifications({
      senderId:senderId,
      receiverId:receiverId,
      type:type,
      description:description
    })
    notifications.save()
    .then(()=>{
      io.emit('received_notifications',notifications)
    })
    .catch((err)=>console.log(err)) 
  });
 
  socket.on('disconnect',()=>{
    console.log('deconnecter')
  })
});

  
//start server
server.listen(process.env.PORT,()=>{
    console.log('Server en marche sur PORT:',process.env.PORT) 
})
  


