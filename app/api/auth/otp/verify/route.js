// app/api/auth/otp/verify/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export async function POST(request) {
  await dbConnect();

  try {
    const { mobileNumber, otp } = await request.json();

    if (!mobileNumber || !otp) {
      return NextResponse.json({ message: 'Mobile number and OTP are required.' }, { status: 400 });
    }

    // Use the Twilio Verify API to check the OTP
    const verificationCheck = await client.verify.v2.services(verifyServiceSid)
      .verificationChecks
      .create({ to: `+91${mobileNumber}`, code: otp });

    // If the OTP is not approved, Twilio will return a status other than 'approved'
    if (verificationCheck.status !== 'approved') {
      return NextResponse.json({ message: 'Invalid or expired OTP.' }, { status: 400 });
    }

    // If the OTP is correct, find or create the user
    // `upsert: true` will create a new user if one doesn't exist
    // `new: true` returns the new document if one was created
    const user = await User.findOneAndUpdate(
      { mobileNumber: mobileNumber },
      { $setOnInsert: { mobileNumber: mobileNumber } }, // We'll prompt for username later
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: 'OTP verified successfully.', user }, { status: 200 });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}