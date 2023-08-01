const jwt=require('jsonwebtoken');
const Users=require('../models/User');
exports.jwtCheck=async (req,resp,next)=>{
  
   const token=req.header('Authorization');
  

   if(!token){
    resp.status(401).json({message:'no token,no party!'});
   }
   try{
   const decodedId= await jwt.verify(token,'secretkey');

   const admi=await Users.findOne({where:{id:decodedId.userId}});

   if(admi){
    req.id=decodedId.userId;
    console.log(decodedId.userId);
    console.log('all good ji');
    next();
    
   }
  
   }catch(error){
    console.log('lode lag gaye ')
    resp.status(404).json({message:'real hacker spotted!'});
   }

}