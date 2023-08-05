const Sib = require("sib-api-v3-sdk");
const sendEmail = async (receiver) => {
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
    subject: "Utkarsh learning Node.js",
    textContent:
      "I am learning how to send reset passoword link via SendinBlue,thank you.",
  });
};

exports.forgotPassword = async (req, resp, next) => {
  console.log("hello");
  const email = req.body.email;
  try {
    const ans = await sendEmail(email);
  } catch (error) {
    console.log(error);
  }

  resp.status(200).json({ message: "working" });
};
