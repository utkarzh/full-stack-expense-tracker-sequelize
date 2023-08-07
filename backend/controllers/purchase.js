const Razorpay = require("razorpay");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
const rzp = new Razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRETKEY,
});

exports.buyPremium = async (req, resp) => {
  try {
    const order = await rzp.orders.create({ amount: 6000, currency: "INR" });
    order.key_id = process.env.RAZOR_ID;
    console.log(order.key_id);
    await req.user.createOrder({ orderId: order.id, status: "Pending.." });
    resp.status(200).json(order);
  } catch (error) {
    resp.status(400).json({ message: "error" });
  }
};
exports.verifyPremium = async (req, resp) => {
  const { orderId, paymentId } = req.body;

  try {
    const order = await Order.findOne({ where: { orderId: orderId } });
    if (paymentId) {
      order.paymentId = paymentId;
      order.status = "success!";
      const newtoken = jwt.sign(
        { userId: req.user.id, isPremium: true },
        process.env.JWTKEY
      );
      resp.status(200).json({ message: "true", token: newtoken });
    } else {
      order.status = "failed!";
    }
    await Promise.all([order.save(), req.user.update({ isPremium: true })]);
    console.log("user-bhi-update-ho-gaya");
    console.log("payment handled!");
  } catch (error) {
    console.log("error", error);
  }
};
