import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

let transporter = null;

if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });
} else {
    // No SMTP configured — we'll fallback to console logging
    transporter = null;
}

export const sendMail = async ({ to, subject, text, html }) => {
    if (!transporter) {
        console.log('Email (dev mode) - to:', to);
        console.log('Subject:', subject);
        console.log('Text:', text);
        return;
    }

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || SMTP_USER,
        to,
        subject,
        text,
        html,
    });
};
