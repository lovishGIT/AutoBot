import nodemailer from 'nodemailer';

const mailAuth = nodemailer.createTransport({
    host: `smtp.${process.env.SERVICE_TYPE}.com`,
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

export default mailAuth;