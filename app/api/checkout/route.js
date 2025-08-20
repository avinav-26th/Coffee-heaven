// app/api/checkout/route.js
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { amount } = await request.json();

    const options = {
      amount: Math.round(amount * 100), // Amount in the smallest currency unit (paise), rounded
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
    }

    return NextResponse.json({ order }, { status: 200 });

  } catch (error) {
    console.error('Error in Razorpay order creation:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}