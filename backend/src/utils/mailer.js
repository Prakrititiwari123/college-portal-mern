import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER || process.env.EMAIL_USER;
const SMTP_PASS = process.env.SMTP_PASS || process.env.EMAIL_PASS;

let transporter = null;

if (SMTP_USER && SMTP_PASS) {
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
        console.log('=== EMAIL (DEV MODE) ===');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('Text:', text);
        console.log('HTML:', html);
        console.log('========================');
        return;
    }

    await transporter.sendMail({
        from: SMTP_USER,
        to,
        subject,
        text,
        html,
    });
};
