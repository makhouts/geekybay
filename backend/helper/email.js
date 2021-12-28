import nodemailer from "nodemailer";

export class Email {

    // async..await is not allowed in global scope, must use a wrapper
    // once buyer places the order: should go to both seller and buyer?
     static orderMail = async (emailAddress) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        let message =  "Placeholder for order mail to seller.";


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
            subject: "Notice of sale - please confirm", // Subject line
            text: `${message}` , // plain text body
            //html: "<b></b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/...
    }

    //once seller confirms the sale
    static orderConfirmationMail = async (emailAddress) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        let message =  "Placeholder for order confirmation mail.";


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
            subject: "Order Confirmation", // Subject line
            text: `${message}` , // plain text body
            //html: "<b></b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/...
    }

    static registrationMail = async (emailAddress) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        let message =  "Placeholder for registration mail.";


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


    static updateMail = async (emailAddress) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        let message =  "Placeholder for update mail.";


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
            subject: "Update successful", // Subject line
            text: `${message}` , // plain text body
            //html: "<b></b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/...
    }

    static forgotPasswordMail = async (emailAddress) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
        let message =  "Placeholder for forgot password mail.";


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
            subject: "forgot password", // Subject line
            text: `${message}` , // plain text body
            //html: "<b></b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/...
    }
}
