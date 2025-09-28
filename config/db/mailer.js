import nodemailer from 'nodemailer'
import { config } from './config.js'
export const transporter = nodemailer.createTransport({
    host: config.userHost,
    port: config.userPort,
    secure: config.userSecure === "true",
    auth: {
        user: config.userUser,
        pass: config.userPass,
    },
})

export const sendPurchaseMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Yesport 🛒" <${config.userUser}>`,
      to,
      subject,
      html,
    });
    console.log("📧 Email enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error enviando email:", error);
    throw error;
  }
};