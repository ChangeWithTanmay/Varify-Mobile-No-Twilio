import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();
// make a Map()
const otpStore = new Map();

// Function to generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// Setup Email Transporter (SMTP Configuration)

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com", 
    port:  465,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: true, 
        minVersion: "TLSv1.2"
    }
});


const sendOTP =  async(email) =>{
    // OTP Valid Time
    const expiresAt = Date.now()+5*60*1000;
    const otp = generateOtp();

    otpStore.set(email, {otp, expiresAt})

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Vectosmind your varification code",
        // text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; text-align: center;">
        <img src="https://yourwebsite.com/logo.png" width="150" alt="Brand Logo">
        <h2 style="color: #333;">Your OTP Code</h2>
        <p style="font-size: 18px; color: #555;">Use the following OTP to verify your email:</p>
        <div style="font-size: 24px; font-weight: bold; color: #007bff; padding: 10px; background: #f1f1f1; display: inline-block; border-radius: 5px;">
            ${otp}
        </div>
        <p style="font-size: 14px; color: #777; margin-top: 20px;">This OTP is valid for 5 minutes.</p>
        <a href="https://your-website.com/verify?otp=${otp}" 
           style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; font-size: 16px; border-radius: 5px; margin-top: 10px;">
           Verify Now
        </a>
        <p style="font-size: 12px; color: #999; margin-top: 20px;">If you did not request this, please ignore this email.</p>
    </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);

        console.log(`✅ ${email} is Address mail successfully sending.`);
    } catch (error) {
        console.log('❌ Error sending Error', error);
    }
};

sendOTP('tanmayfb24pgs@gmail.com');