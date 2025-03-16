import twilio from 'twilio';
import dotenv from 'dotenv';
import { otpGenerator } from './otpGenerate.js';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFromNumber = process.env.TWILIO_FROM_NUMBER;
const twilioToNumber = process.env.TWILIO_TO_NUMBER;

const client = twilio(accountSid, authToken);

// check Number is valid or not.
const isStringAndValid = (number) => {
    return typeof number === 'string' && /^\+\d{10,15}$/.test(number);
};

const sendSMS = async (body, Number) => {
    try {
        if(isStringAndValid(Number)){
            const mesOption = {
                from: twilioFromNumber,
                to: Number,
                body
            }
            console.log(mesOption);
            const message = await client.messages.create(mesOption);
            // console.log(message);
            console.log("\n\n\n✅ Message Sent! SID:", message.sid);
        }
        else{
            console.log("❌ Please Enter valid Number..");
        }
    } catch (error) {
        console.log("🚨 Error occurred while sending SMS:", error.message);
    }
}

const otp=otpGenerator();
sendSMS(`Hi User,\n\n Your OTP is: ${otp} \n Dont't shear OTP.`, twilioToNumber);
const varifyOTP = (userOTP) =>{
    if(!(otp===userOTP)){
        console.log("Please Enter valid otp");
    }
}