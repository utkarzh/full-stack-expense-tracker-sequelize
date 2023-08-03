const Razorpay=require('razorpay');
const Order=require('../models/Order')
const rzp=new Razorpay({
    key_id:process.env.RAZOR_ID,
    key_secret:process.env.RAZOR_SECRETKEY
})

exports.buyPremium=async (req,resp)=>{
    try {
        const order=await rzp.orders.create({amount:5000,currency:'INR'});
        order.key_id=process.env.RAZOR_ID
        console.log(order.key_id);
        await req.user.createOrder({orderId:order.id,status:'Pending..'});
        resp.status(200).json(order);
    } catch (error) {
        resp.status(400).json({message:'error'})
    }

}
exports.verifyPremium=async (req,resp)=>{
    const {orderId,paymentId}=req.body;
    
    try {
    const order=  await Order.findOne({where:{orderId:orderId}});
    if(paymentId){
        order.paymentId=paymentId;
        order.status='success!';
        resp.status(200).json({message:'true'})
    }
    else{
       
        order.status='failed!';
    }
    await Promise.all(order.save(),req.user.update({isPremium:true}));
    console.log('payment handled!')
  
        
    } catch (error) {
        
        console.log('error ho gaaya',error);
    }
}