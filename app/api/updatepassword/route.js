import { NextResponse } from 'next/server';
import { connectDB } from '@/db/connectDB';
import { User } from '@/models/User';

export async function POST(req) {
  const { passwordArray, email } = await req.json();
  await connectDB();

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email, passwords: passwordArray });
  } else {
    user.passwords = passwordArray;
  }

  await user.save();
  return NextResponse.json({ success: true });
}