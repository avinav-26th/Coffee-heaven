// app/api/reviews/comment/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  await dbConnect();
  try {
    const { item, comment } = await request.json();
    if (!item || !comment) return NextResponse.json({ message: 'Item and comment are required.' }, { status: 400 });

    // Find the review by user and item, and update it by adding the comment.
    // This assumes a star rating was already given.
    const updatedReview = await Review.findOneAndUpdate(
      { user: session.user.id, item: item },
      { comment: comment },
      { new: true, upsert: false } // upsert: false ensures we don't create a review if one doesn't exist
    );

    if (!updatedReview) {
      return NextResponse.json({ message: 'You must rate the item before adding a comment.' }, { status: 404 });
    }
    // Invalidate the cache for the homepage and orders page
    revalidatePath('/');
    revalidatePath('/orders');
    
    return NextResponse.json({ message: 'Comment added successfully.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to add comment.' }, { status: 500 });
  }
}