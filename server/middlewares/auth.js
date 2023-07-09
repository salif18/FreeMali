//importation 
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

//configuration
dotenv.config()

module.exports = (req,res,next)=>{
    try{
        //recuperer le token de l'header des donnee entrants
        const token = req.headers.authorization.split(' ')[1];
        //verifier le token recuperer
        const decodedToken = jwt.verify(token,`${process.env.KEY_TOKEN}`)
        //recuperer userId qui se trouve dans le token
        const userId = decodedToken.userId
    
        req.auth ={ 
            userId:userId
        },
      
        next()
        console.log(token)
    }catch(err){
        console.log(err)
      return res.status(401).json({
            message:'erreur authentification',
            err
        })
    }
}