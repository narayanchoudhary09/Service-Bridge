import { Vonage } from '@vonage/server-sdk';
import dotenv from "dotenv";

dotenv.config(); // Correct dotenv configuration

const { VOYAGE_API_KEY, VOYAGE_API_SECRET } = process.env;


const vonage = new Vonage({
  apiKey: VOYAGE_API_KEY,
  apiSecret: VOYAGE_API_SECRET
});

const from = "Vonage APIs";

export default async function sendSMS(to, text) { // Modified function to accept parameters
  try {  
  console.log(VOYAGE_API_KEY,VOYAGE_API_SECRET);
    const response = await vonage.sms.send({ to, from, text });
    console.log('Message sent successfully');
    console.log(response);
  } catch (err) {
    console.log('There was an error sending the message.');
    console.error(err);
  }
}
