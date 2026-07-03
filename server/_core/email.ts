import nodemailer from "nodemailer";
import { ENV } from "./env";

// For development, use a test email service
// For production, configure with your email provider (SendGrid, AWS SES, etc.)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string, userName: string) {
  const verificationUrl = `${process.env.APP_URL || "http://localhost:3000"}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@skycoin4444.com",
    to: email,
    subject: "Verify your SKYCOIN4444 account",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0066FF 0%, #7C3AED 100%); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">SKYCOIN4444</h1>
          <p style="margin: 5px 0 0 0;">Email Verification</p>
        </div>
        <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi ${userName},</p>
          <p>Thank you for signing up for SKYCOIN4444! To complete your registration, please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" style="background: #0066FF; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #666; font-size: 12px;">Or copy and paste this link in your browser:</p>
          <p style="color: #0066FF; font-size: 12px; word-break: break-all;">${verificationUrl}</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">This link will expire in 24 hours.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">If you didn't create this account, please ignore this email.</p>
          <p style="color: #999; font-size: 11px; margin-top: 20px;">© 2026 SKYCOIN4444. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendWelcomeEmail(email: string, userName: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@skycoin4444.com",
    to: email,
    subject: "Welcome to SKYCOIN4444!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0066FF 0%, #7C3AED 100%); padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Welcome to SKYCOIN4444</h1>
        </div>
        <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi ${userName},</p>
          <p>Your email has been verified and your account is now active! You're ready to start using SKYCOIN4444.</p>
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Get Started:</h3>
            <ul style="color: #333;">
              <li>Complete your profile</li>
              <li>Connect your wallet</li>
              <li>Start earning with SKYCOIN4444</li>
              <li>Join the community</li>
            </ul>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">© 2026 SKYCOIN4444. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
