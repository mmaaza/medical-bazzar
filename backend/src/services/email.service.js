const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationOTP = async (email, otp) => {
  const message = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Email Verification OTP - Medical Bazzar Nepal',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #f97316;">Welcome to Medical Bazzar Nepal!</h1>
        </div>
        <div style="background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for registering with Medical Bazzar Nepal. To complete your registration and access our medical supplies platform, please use the following OTP code:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; display: inline-block;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #f97316;">${otp}</span>
            </div>
          </div>
          <p style="color: #666; line-height: 1.6;">
            This OTP will expire in 10 minutes. If you did not create an account with Medical Bazzar Nepal, please ignore this email.
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} Medical Bazzar Nepal. All rights reserved.</p>
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
    subject: 'Password Reset Request - Medical Bazzar Nepal',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #f97316;">Medical Bazzar Nepal Password Reset</h1>
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
          <p>&copy; ${new Date().getFullYear()} Medical Bazzar Nepal. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(message);
};

module.exports = {
  sendVerificationOTP,
  sendPasswordResetEmail
};