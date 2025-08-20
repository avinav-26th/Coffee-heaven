// app/api/profile/setup/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function PATCH(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { username } = await request.json();

    if (!username || username.trim().length < 3) {
      return NextResponse.json({ message: 'Username must be at least 3 characters long.' }, { status: 400 });
    }

    // Check if the username is already taken by another user
    const existingUser = await User.findOne({ username: username });
    if (existingUser && existingUser._id.toString() !== session.user.id) {
        return NextResponse.json({ message: 'Username is already taken.' }, { status: 409 });
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { username: username.trim() },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully.', user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}