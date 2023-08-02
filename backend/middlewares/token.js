const jwt=require('jsonwebtoken');
const Users=require('../models/User');
exports.jwtCheck=async (req,resp,next)=>{
  
   const token=req.header('Authorization');
  

   if(!token){
    throw new Error();
   }
   try{
   const decodedId= await jwt.verify(token,process.env.JWTKEY);

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