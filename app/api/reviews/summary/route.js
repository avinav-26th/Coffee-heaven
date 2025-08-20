// app/api/reviews/summary/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';

export async function GET(request) {
  await dbConnect();

  try {
    const summary = await Review.aggregate([
      {
        $group: {
          _id: '$item', // Group reviews by the 'item' field
          averageRating: { $avg: '$rating' }, // Calculate the average of the 'rating' field
          reviewCount: { $sum: 1 }, // Count the number of reviews in each group
        },
      },
      {
        $project: {
          // Reshape the output
          _id: 0, // Exclude the default _id field
          item: '$_id', // Rename _id to 'item'
          averageRating: 1,
          reviewCount: 1,
        },
      },
    ]);

    // Convert the array of objects into a single object keyed by item name for easy lookup
    const summaryMap = summary.reduce((acc, curr) => {
        acc[curr.item] = {
            averageRating: curr.averageRating,
            reviewCount: curr.reviewCount,
        };
        return acc;
    }, {});

    return NextResponse.json({ summary: summaryMap }, { status: 200 });
  } catch (error) {
    console.error('Error fetching review summary:', error);
    return NextResponse.json({ message: 'Failed to fetch review summary.' }, { status: 500 });
  }
}