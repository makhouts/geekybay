import nodemailer from "nodemailer";

export class Email {
  static hostname = "smtp.live.com";
  static siteEmail = "geekybay@outlook.com";
  static sender = '"GeekyBay" <geekybay@outlook.com>';

  // async..await is not allowed in global scope, must use a wrapper
  // once buyer places the order: should go to buyer?
  //userData array contains buyer's first and last name
  static orderMail = async (emailAddress, userData) => {
    // Generate test SMTP service account from ethereal.emai, only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    let message = `Hello ${userData[0]} ${userData[1]}, \n your order has been registered. \n The seller(s) will confirm your order within 3 business days. \n Thank you for choosing GeekyBay!`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: Email.hostname,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: Email.siteEmail, // email user
        pass: process.env.EMAILPASSWORD, // email password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: Email.sender, // sender address
      to: emailAddress, // receiving email parameter from authRouter
      subject: "Notice of sale - please confirm", // Subject line
      text: `${message}`, // plain text body
      //html: "<b></b>", // html body
    });
  };

  //once seller confirms the sale
  static orderConfirmationMail = async (emailAddress, buyerFirstName, buyerLastName, sellerUserName, productName, quantity) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
    let message = `Hello, ${buyerFirstName} ${buyerLastName}. <br>
                Your order of ${productName}: quantity: ${quantity} has been confirmed by ${sellerUserName}.<br>
                If you have ordered products from different sellers, look for a separate confirmation email for the relevant products.`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: Email.hostname,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: Email.siteEmail, // email user
        pass: process.env.EMAILPASSWORD, // email password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: Email.sender, // sender address
      to: emailAddress, // receiving email parameter from authRouter
      subject: "Order Confirmation", // Subject line
      text: `${message}`, // plain text body
      html: `${message}`, // html body
    });
  };

  static registrationMail = async (emailAddress, username) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
    let message = `Hello, ${username}, you have signed up at GeekyBay. \nUpload and sell your products at <a href="https://geekybay.herokuapp.com/">GeekyBay</a> today!`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: Email.hostname,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: Email.siteEmail, // email user
        pass: process.env.EMAILPASSWORD, // email password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: Email.sender, // sender address
      to: emailAddress, // receiving email parameter from authRouter
      subject: "Welcome to GeekyBay", // Subject line
      text: `${message}`, // plain text body
      //html: "<b></b>", // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/...
  };

  static updateMail = async (emailAddress) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
    let message = "Placeholder for update mail.";

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: Email.hostname,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: Email.siteEmail, // email user
        pass: process.env.EMAILPASSWORD, // email password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: Email.sender, // sender address
      to: emailAddress, // receiving email parameter from authRouter
      subject: "Update successful", // Subject line
      text: `${message}`, // plain text body
      //html: "<b></b>", // html body
    });
  };

  static sendResetMail = async (emailAddress, link) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    let message = `Placeholder for reset password mail, follow this link: ${link}`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: Email.hostname,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: Email.siteEmail, // email user
        pass: process.env.EMAILPASSWORD, // email password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: Email.sender, // sender address
      to: emailAddress, // receiving email parameter from authRouter
      subject: "Reset your GeekyBay password", // Subject line
      text: `${message}`, // plain text body
      //html: "<b></b>", // html body
    });
  };
}
