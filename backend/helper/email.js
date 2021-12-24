import nodemailer from "nodemailer";
// async..await is not allowed in global scope, must use a wrapper


export const sendEmail = async () => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

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
        from: '"GeekyBay" <geekybay@example.com>', // sender address
        to: "jack@example.com, jill@example.com", // list of receivers
        subject: "super crucial notification", // Subject line
        text: "Not all that important update", // plain text body
        html: "<b>Same update in HTML format.</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/...
}


export default sendEmail;