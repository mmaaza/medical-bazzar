const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  const message = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Email Verification - MediSanj',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #f97316;">Welcome to MediSanj!</h1>
        </div>
        <div style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for registering with MediSanj. To complete your registration and access our medical supplies platform, please verify your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #666; line-height: 1.6;">
            This verification link will expire in 24 hours. If you did not create an account with MediSanj, please ignore this email.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
            <p>If you're having trouble clicking the button, copy and paste this URL into your web browser:</p>
            <p style="word-break: break-all;">${verificationUrl}</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} MediSanj. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(message);
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const message = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request - MediSanj',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #f97316;">MediSanj Password Reset</h1>
        </div>
        <div style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="color: #666; line-height: 1.6;">
            You are receiving this email because you (or someone else) has requested to reset your password. Click the button below to create a new password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; line-height: 1.6;">
            This password reset link will expire in 10 minutes. If you did not request a password reset, please ignore this email and your password will remain unchanged.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
            <p>If you're having trouble clicking the button, copy and paste this URL into your web browser:</p>
            <p style="word-break: break-all;">${resetUrl}</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} MediSanj. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(message);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};