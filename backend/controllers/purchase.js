const Razorpay=require('razorpay');
const rzp=new Razorpay({
    key_id:process.env.RAZOR_ID,
    key_secret:process.env.RAZOR_SECRETKEY
})

exports.buyPremium=async (req,resp)=>{
    try {
        const order=await rzp.orders.create({amount:5000,currency:'INR'});
        order.key_id=process.env.RAZOR_ID
        console.log(order.key_id);
        resp.status(200).json(order);
    } catch (error) {
        resp.status(400).json({message:'error'})
    }

}