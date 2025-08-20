// app/api/auth/otp/send/route.js
import { NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(request) {
  try {
    const { mobileNumber } = await request.json();

    if (!mobileNumber) {
      return NextResponse.json({ message: 'Mobile number is required.' }, { status: 400 });
    }

    // Use the Twilio Verify API to send the OTP
    const verification = await client.verify.v2.services(verifyServiceSid)
      .verifications
      .create({ to: `+91${mobileNumber}`, channel: 'sms' });

    console.log(verification.status); // Should be 'pending'

    return NextResponse.json({ message: 'OTP sent successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Error sending OTP:', error);
    // Twilio might return specific error codes we can handle here
    return NextResponse.json({ message: 'Failed to send OTP.' }, { status: 500 });
  }
}