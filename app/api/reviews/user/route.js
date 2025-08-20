// app/api/reviews/user/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const userReviews = await Review.find({ user: session.user.id });

    // Create a map for easy lookup on the frontend, e.g., { "Cappuccino": 4, "Latte": 5 }
    const ratingsMap = userReviews.reduce((acc, review) => {
      acc[review.item] = review;
      return acc;
    }, {});

    return NextResponse.json({ ratings: ratingsMap }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user ratings:', error);
    return NextResponse.json({ message: 'Failed to fetch user ratings.' }, { status: 500 });
  }
}