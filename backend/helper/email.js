import nodemailer from "nodemailer";

const messageContent = (mailType) => {
    const content = {"registration": "Placeholder for registration mail.",
                     "update": "Placeholder for an update to an existing product/user",
                     "newPassword": "Placeholder for a forgot password email.",
                     "buyerOrder": "Placeholder for order mail to buyer.",
                     "sellerOrder": "Placeholder for order mail to seller."};
    return content[mailType];
};



// async..await is not allowed in global scope, must use a wrapper
export const email = async (emailAddress, mailType) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    let message = messageContent(mailType);


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"GeekyBay" <geekybay@geekybay.com>', // sender address
        to: emailAddress, // receiving email parameter from authRouter
        subject: "Welcome to GeekyBay", // Subject line
        text: `${message}` , // plain text body
        //html: "<b></b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/...
}

