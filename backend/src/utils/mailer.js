import nodemailer from "nodemailer";

export const sendMail = async (to, subject, html) => {
  try {
    console.log("Started Sending Email");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    
    const mailOption = {
      from: process.env.GMAIL_USER,
      to:to.email,
      subject,
      html
    };

    const res = await transporter.sendMail(mailOption);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
