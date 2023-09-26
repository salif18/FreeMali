const Notifications = require("../models/notifications");

// add notifications
exports.creatNotifications = (req, res,next) => {
  const notifications = new Notifications(req.body);
  notifications
    .save()
    .then((notification) => res.status(201).json(notification))
    .catch((err) => res.status(400).json({ err }));
};


// recevoir notification pour les presta
exports.getnotificationsOffre = (req, res,next) => {
  const { status } = req.body;
  Notifications
    .find({ status:status }).sort({createdAt:-1})
    .then((notification) => res.status(200).json(notification))
    .catch((err) => res.status(400).json({ err }));
};

// recevoir son notification
exports.getnotifications = (req, res,next) => {
  const { receiverId } = req.params;
  Notifications
    .find({ receiverId: receiverId }).sort({createdAt:-1})
    .then((notification) => res.status(200).json(notification))
    .catch((err) => res.status(400).json({ err })); 
};

// recevoir notification for admin
exports.getnotificationsAdmin = (req, res,next) => { 
  const { userId } = req.params;
  Notifications
    .find({ adminId: userId }).sort({createdAt:-1})
    .then((notification) => res.status(200).json(notification))
    .catch((err) => res.status(400).json({ err }));
};

// supprimer la notification
exports.delNotifications=(req,res, next)=>{
  const {id} = req.params;
  console.log(id)
  Notifications
     .deleteOne({_id:id})
     .then((noti)=>res.status(201).json(noti))
     .catch((err)=>res.status(400).json({err}))
}

// changer le status de notification lue
exports.changeStatus =(req,res,next)=>{
  const {id} = req.params
  const {newStatus} = req.body
  Notifications.findOneAndUpdate(
    {_id:id},
    {$set:{status:newStatus}},
    {new:true}
  )
  .then((notification)=>res.status(201).json({status:notification.status}))
  .catch((err)=>res.status(400).json({err}))
}
