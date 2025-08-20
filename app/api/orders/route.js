// app/api/orders/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';


export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const orders = await Order.find({ user: session.user.id })
      .sort({ createdAt: -1 }); // Sort by newest first

    return NextResponse.json({ orders }, { status: 200 });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'An error occurred while fetching orders.' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { items, totalAmount } = await request.json();

    if (!items || items.length === 0 || !totalAmount) {
      return NextResponse.json({ message: 'Missing required order information.' }, { status: 400 });
    }

    const newOrder = new Order({
      user: session.user.id,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: totalAmount,
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json({ message: 'Order created successfully.', order: savedOrder }, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'An error occurred while creating the order.' }, { status: 500 });
  }
}