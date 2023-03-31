import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.strato.de',
    port: 587,
    secure: false,
    auth: {
        user: process.env.STRATO_MAIL_USER,
        pass: process.env.STRATO_MAIL_PASSWORD,
    },
});

export default transporter;
