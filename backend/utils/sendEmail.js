const nodeMailer = require("nodemailer");
const { options } = require("../app");

const sendEmail = async(options) => {
    // console.log("Options",options);

    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure:true,
        service: process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    })
    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }
    // console.log("transporter",transporter);
    // console.log("mailOptions",mailOptions);


    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;