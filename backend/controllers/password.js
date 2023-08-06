const Sib = require("sib-api-v3-sdk");
const bcrypt = require("bcrypt");
const PasswordReset = require("../models/PasswordReset");
const User = require("../models/User");

const uuid = require("uuid");
exports.resetPassword = async (req, resp, next) => {
  const id = req.params.id;
  try {
    const resetToken = await PasswordReset.findOne({ where: { id: id } });
    if (resetToken.isActive == true) {
      const userId = resetToken.UserId;
      const user = await User.findOne({ where: { id: userId } });
      resp.send(`
        <form action="/password/updatepassword" method="post">
          Enter new password: <input type="password" name="password">
          <input type="hidden" name="userId" value="${userId}">
          <input type="submit" value="Submit">
        </form>
      `);
    } else {
      resp.status(404).json("Link inactive now!");
    }
  } catch (error) {
    resp.status(500).json("Error occurred while processing the request.");
  }
};

exports.updatePassword = async (req, resp) => {
  const userId = req.body.userId;
  const newPassword = req.body.password;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return resp.status(404).json("User not found.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    const resetToken = await PasswordReset.findOne({
      where: { UserId: userId },
    });
    resetToken.isActive = false;
    await resetToken.save();

    resp.status(200).json("Password updated successfully!");
  } catch (error) {
    resp.status(500).json("Error occurred while updating the password.");
  }
};

exports.forgotPassword = async (req, resp, next) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw Error;
    }
    const id = uuid.v4();
    await user.createPasswordReset({ id: id, isActive: true });
    await sendEmail(user.email, id);
    resp.status(200).json();
  } catch (error) {
    console.log("inside the error block again");
    resp.status(404).json();
    console.log(error);
  }
};
const sendEmail = async (receiver, id) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BLUE_API;
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: "utkarsh.parihar.435@gmail.com",
  };
  const receivers = [
    {
      email: receiver,
    },
  ];
  await tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: "Password Reset:The Expense Tracker",
    textContent: "this is example text content",
    htmlContent: `To reset your password<a href="http://localhost:3000/password/resetpassword/${id}">Click here</a>`,
  });
};
