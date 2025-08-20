// app/api/profile/route.js
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
    const { username, email, avatarUrl } = await request.json();

    // --- Validation ---
    if (!username || username.trim().length < 3) {
      return NextResponse.json({ message: 'Username must be at least 3 characters long.' }, { status: 400 });
    }
    
    // Check if username is taken
    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername && existingUsername._id.toString() !== session.user.id) {
        return NextResponse.json({ message: 'Username is already taken.' }, { status: 409 });
    }

    // Check if email is taken (if provided)
    if (email) {
      const existingEmail = await User.findOne({ email: email.trim() });
      if (existingEmail && existingEmail._id.toString() !== session.user.id) {
        return NextResponse.json({ message: 'Email is already in use.' }, { status: 409 });
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { 
        name: username.trim(), // NextAuth session uses `name` for username
        username: username.trim(),
        email: email ? email.trim() : null,
        avatarUrl: avatarUrl,
        image: avatarUrl,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully.' }, { status: 200 });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}