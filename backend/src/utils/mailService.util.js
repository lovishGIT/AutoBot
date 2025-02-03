import mailAuth from "../config/mailer.config.js";

const sendEmail = async (mailMessages) => {

    if (!mailMessages || !mailMessages.to) {
        console.log("Empty Mail Provided...");
        return null;
    }
    const {to, subject, text, html} = mailMessages;
    const mailOptions = {
        from: `"Auto Bot" <${process.env.USER_EMAIL}>`,
        to,
        subject,
        text,
        html,
    };

    // Send mail with defined transport object
    try {
        const info = await mailAuth.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error("Error Found", error);
        return null;
    }
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

export default sendEmail;