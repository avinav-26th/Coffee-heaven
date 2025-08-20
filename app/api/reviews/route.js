// app/api/reviews/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';

// GET handler to fetch reviews for a specific item
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const itemName = searchParams.get('item');

  if (!itemName) {
    return NextResponse.json({ message: 'Item name is required.' }, { status: 400 });
  }

  await dbConnect();

  try {
    const reviews = await Review.find({ item: itemName })
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ message: 'Failed to fetch reviews.' }, { status: 500 });
  }
}

// POST handler to submit a new review
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { item, rating, comment } = await request.json();

    if (!item || !rating) {
      return NextResponse.json({ message: 'Item and rating are required.' }, { status: 400 });
    }

    // Use updateOne with upsert to efficiently create or update a review
    await Review.updateOne(
      { user: session.user.id, item: item },
      { $set: { rating, ...(comment && { comment }) } },
      { upsert: true } // Creates the document if it doesn't exist
    );
    
    // Invalidate the cache for the homepage and orders page
    revalidatePath('/');
    revalidatePath('/orders');

    return NextResponse.json({ message: 'Review submitted successfully.' }, { status: 201 });

  } catch (error) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ message: 'Failed to submit review.' }, { status: 500 });
  }
}